import Categories from "@/ClientComponent/Categories";
import Card from "@/ClientComponent/Card";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HashLoader } from "react-spinners";

function CategoriesPage() {
  const { id } = useParams();

  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const getSeletedProduct = () => {
    return axios.get(`${backendUrl}/getSeletedProducts/${id}`);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["selectedProducts", id],
    queryFn: getSeletedProduct,
  });

  return (
    <>
      <div className="p-3 text-center bg-primary">
        <h1 className="text-white font-bold">{id}</h1>
      </div>
      <div className="category flex overflow-auto gap-4 max-w-[900px] mx-auto p-4"></div>
      <div className="product space-y-5 p-4">
        <p className="font-extrabold text-primary">popular products</p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {isLoading ? (
            <HashLoader color="#16a34a" size={40} />
          ) : (
            data.data.products.map((product) => (
              <Card
                key={product._id}
                product={product}
                category={data.data.categoryName}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default CategoriesPage;
