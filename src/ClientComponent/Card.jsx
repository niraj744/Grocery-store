import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function CardComponent({ product, category }) {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const [quantity, setQuantity] = useState(product.quantity);

  const increament = (e) => {
    if (e.target.innerHTML === "+") {
      if (quantity < 10) {
        setQuantity((oldQuantity) => oldQuantity + 1);
      } else {
        setQuantity(10);
      }
    }
    if (e.target.innerHTML === "-") {
      if (quantity > 1) {
        setQuantity((oldQuantity) => oldQuantity - 1);
      } else {
        setQuantity(1);
      }
    }
  };

  const addCart = (data) => {
    return axios.post(`${backendUrl}/addCard`, data);
  };

  const client = useQueryClient();

  const onSuccess = ({ data }) => {
    if (data.message) {
      client.invalidateQueries({
        queryKey: ["orders"],
      });
      toast(data.message);
    }
  };

  const { mutate } = useMutation({
    mutationFn: addCart,
    onSuccess: onSuccess,
  });

  const addToCart = () => {
    if (isSignedIn && user) {
      mutate({
        userID: user.id,
        product: product._id,
        amount: product.price * quantity,
        quantity: quantity,
      });
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      <div className="card group">
        <Card className="p-5 cursor-pointer hover:shadow-[0px_0px_36px_-10px_black] transition-shado">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <LazyLoadImage
              src={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_180,h_180/q_auto:good,f_auto/${product.productImage.slice(
                product.productImage.indexOf("upload/") + 7
              )}`}
              placeholderSrc={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_180,h_180/e_blur:10000,q_1,f_auto/${product.productImage.slice(
                product.productImage.indexOf("upload/") + 7
              )}`}
              effect="blur"
              alt={product.productName}
            />
            <h2 className="text-[1.2rem] font-semibold line-clamp-1">
              {product.productName}
            </h2>
            <h2 className="text-[1.2rem] text-gray-600 font-semibold">
              ${product.price}
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="capitalize text-primary hover:bg-primary hover:text-white"
                  variant="ghost"
                >
                  add to card
                </Button>
              </DialogTrigger>
              <DialogContent className="fixed bg-white left-[50%] max-w-[600px] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex text-center justify-between gap-2 sm:text-left flex-col items-center sm:items-start sm:flex-row">
                  <div className="bg-slate-200 rounded-lg p-4 w-[300px] flex items-center justify-center aspect-square">
                    <LazyLoadImage
                      src={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_180/q_auto:good,f_auto/${product.productImage.slice(
                        product.productImage.indexOf("upload/") + 7
                      )}`}
                      placeholderSrc={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_180/q_1,f_auto/${product.productImage.slice(
                        product.productImage.indexOf("upload/") + 7
                      )}`}
                      effect="blur"
                      alt={product.productName}
                    />
                  </div>
                  <div className="description space-y-2">
                    <DialogTitle className="font-bold text-xl line-clamp-1">
                      {product.productName}
                    </DialogTitle>
                    <p className="text-gray-600 line-clamp-1">
                      {product.description}
                    </p>
                    <h2 className="font-bold text-2xl">${product.price}</h2>
                    <h2 className="font-bold text-lg">
                      quantity {product.weight}
                    </h2>
                    <div className="flex items-center justify-center flex-row sm:justify-start gap-3">
                      <div
                        className="flex border-2 p-2 rounded-sm text-lg font-semibold"
                        onClick={increament}
                      >
                        <button>-</button>
                        <p className="w-28 text-center">{quantity}</p>
                        <button>+</button>
                      </div>
                      <p className="font-bold text-2xl">
                        = ${product.price * quantity}
                      </p>
                    </div>
                    <Button
                      className="capitalize space-x-2"
                      onClick={addToCart}
                    >
                      <p>add to card</p>
                    </Button>
                    <p className="font-bold text-lg">
                      category:{" "}
                      <span className="font-semibold">{category}</span>
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CardComponent;
