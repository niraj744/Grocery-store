import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  IconCategoryFilled,
  IconSearch,
  IconShoppingCartFilled,
  IconTrashFilled,
} from "@tabler/icons-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Header() {
  const backendURL = import.meta.env.VITE_BACKENDURL;
  const { user } = useUser();
  const [totalprice, setTotal] = useState(0);

  const getUserOrders = async () => {
    return axios.get(`${backendURL}/getOrders/${user.id}`);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
  });

  useEffect(() => {
    let total = 0;
    const totalPrice = data?.data?.map((element) => {
      total += element.amount;
    });
    setTotal(total);
  }, [data]);

  const client = useQueryClient();

  const deleteItem = ({ id }) => {
    return axios.delete(`${backendURL}/deleteCartItem/${id}`);
  };

  const { mutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: ({ data }) => {
      if (data.message) {
        client.invalidateQueries({
          queryKey: ["orders"],
        });
      }
    },
  });

  const deleteItemFromCard = async (_id) => {
    mutate({
      id: _id,
    });
  };

  const { isLoading: loading, data: category } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get(`${backendURL}/getCategories`),
  });

  return (
    <>
      <header className="bg-white flex justify-between items-center px-5 gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src="/logo.png" alt="logo" />
          </Link>
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <li className="list-none flex items-center gap-1 p-3 bg-slate-300 rounded-full">
                  <IconCategoryFilled />
                  <p>categories</p>
                </li>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {loading ? (
                    <HashLoader color="#16a34a" size={40} />
                  ) : (
                    category?.data?.map((cat) => (
                      <Link to={`/category/${cat.categoryName}`} key={cat._id}>
                        <DropdownMenuItem className="flex gap-2 items-center w-full cursor-pointer">
                          <LazyLoadImage
                            src={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_30/q_auto:good,f_auto/${cat.categoryImage.slice(
                              cat.categoryImage.indexOf("upload/") + 7
                            )}`}
                            placeholderSrc={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_30/e_blur:10000,q_1,f_auto/${cat.categoryImage.slice(
                              cat.categoryImage.indexOf("upload/") + 7
                            )}`}
                            effect="blur"
                            alt={cat.categoryName}
                          />
                          {cat.categoryName}
                        </DropdownMenuItem>
                      </Link>
                    ))
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="hidden md:block md:w-full md:max-w-[300px]">
          <li className="bg-slate-200 p-2 rounded-full flex items-center">
            <IconSearch stroke={2} />
            <input
              type="text"
              placeholder="search..."
              className="w-full rounded-full p-1 bg-transparent outline-none"
            />
          </li>
        </div>
        <div className="flex items-center gap-4">
          <div className="card">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <IconShoppingCartFilled />
                  <p className="font-medium w-8 aspect-square text-center p-1 bg-primary text-white rounded-full">
                    <SignedIn>{isLoading ? 0 : data?.data?.length}</SignedIn>
                    <SignedOut>0</SignedOut>
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="top-0 h-full right-0 max-w-[400px]">
                <DialogTitle className="bg-primary text-white p-3">
                  my cards
                </DialogTitle>
                <SignedIn>
                  <div className="overflow-auto h-5/6">
                    {!isLoading ? (
                      <>
                        {data?.data?.map((orders) => {
                          return (
                            <div
                              className="flex items-center gap-4 justify-start mb-4 mt-4"
                              key={orders._id}
                            >
                              <LazyLoadImage
                                src={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_50/q_auto:good,f_auto/${orders.product.productImage.slice(
                                  orders.product.productImage.indexOf(
                                    "upload/"
                                  ) + 7
                                )}`}
                                placeholderSrc={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_50/q_1,f_auto/${orders.product.productImage.slice(
                                  orders.product.productImage.indexOf(
                                    "upload/"
                                  ) + 7
                                )}`}
                                effect="blur"
                                alt={orders.product.productName}
                              />
                              <div className="flex justify-between items-center w-full">
                                <div>
                                  <p className="font-bold">
                                    {orders.product.productName}
                                  </p>
                                  <p className="font-semibold text-gray-500">
                                    quantity: {orders.quantity}
                                  </p>
                                  <p className="font-bold">${orders.amount}</p>
                                </div>
                                <span
                                  className="font-bold cursor-pointer text-red-700"
                                  onClick={() => deleteItemFromCard(orders._id)}
                                >
                                  <IconTrashFilled />
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <HashLoader />
                    )}
                  </div>
                  <div className="checkout bg-white flex gap-2 mt-3 flex-col fixed bottom-5">
                    <h1 className="font-bold text-2xl">
                      total price : ${totalprice}
                    </h1>
                    <Button className="capitalize">check out</Button>
                  </div>
                </SignedIn>
                <SignedOut>
                  <p className="font-bold flex justify-center items-center min-h-[60vh] text-2xl">
                    Login to see cart's item
                  </p>
                </SignedOut>
              </DialogContent>
            </Dialog>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="login">
              <Button asChild>
                <Link to="/sign-in">Login</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </header>
    </>
  );
}

export default Header;
