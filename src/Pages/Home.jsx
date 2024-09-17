import React, { useEffect } from "react";
import Crousel from "@/ClientComponent/Crousel";
import Categories from "@/ClientComponent/Categories";
import Card from "@/ClientComponent/Card";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import axios from "axios";

function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const addUser = (data) => {
    const values = axios.post(`${backendUrl}/userCreate`, data);
    return values;
  };

  const { mutate } = useMutation({
    mutationFn: addUser,
  });

  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get(`${backendUrl}/getCategories`),
  });

  const { isLoading: Productloading, data: Productdata } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`${backendUrl}/getProducts`),
  });

  useEffect(() => {
    if ((isLoaded, user)) {
      mutate({ ID: user.id, username: user.username });
    }
  }, [isSignedIn]);

  return (
    <>
      <div className="p-3 sm:p-10 space-y-10">
        <Crousel />
        <div className="cardsContainer space-y-5">
          <p className="font-extrabold text-primary">popular categories</p>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
            {isLoading ? (
              <>
                <HashLoader color="#16a34a" size={40} />
              </>
            ) : (
              data?.data?.map((items) => {
                return (
                  <Categories
                    showHeading={true}
                    key={items._id}
                    category={items}
                  />
                );
              })
            )}
          </ul>
        </div>
        <div className="cardsContainer space-y-5">
          <p className="font-extrabold text-primary">popular products</p>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
            {Productloading ? (
              <>
                <HashLoader color="#16a34a" size={40} />
              </>
            ) : (
              Productdata?.data?.map((items) => {
                return (
                  <Card
                    key={items._id}
                    product={items}
                    category={items.category.categoryName}
                  />
                );
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
