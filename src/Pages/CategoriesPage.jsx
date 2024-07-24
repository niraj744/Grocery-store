import Categories from "@/ClientComponent/Categories";
import Card from "@/ClientComponent/Card";
import React from "react";
import { useParams } from "react-router-dom";

function CategoriesPage() {
  const { id } = useParams();
  return (
    <>
      <div className="p-3 text-center bg-primary">
        <h1 className="text-white font-bold">{id}</h1>
      </div>
      <div className="category flex overflow-auto gap-4 max-w-[900px] mx-auto p-4">
        <Categories showHeading={true} />
        <Categories showHeading={true} />
        <Categories showHeading={true} />
        <Categories showHeading={true} />
      </div>
      <div className="product space-y-5 p-4">
        <p className="font-extrabold text-primary">popular products</p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          <Card />
          <Card />
          <Card />
        </ul>
      </div>
    </>
  );
}

export default CategoriesPage;
