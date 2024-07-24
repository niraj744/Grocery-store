import React, { useEffect } from "react";
import Crousel from "@/ClientComponent/Crousel";
import Categories from "@/ClientComponent/Categories";
import Card from "@/ClientComponent/Card";
import { useUser } from "@clerk/clerk-react";

function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      console.log(user.firstName);
    }
  }, [isSignedIn]);

  return (
    <>
      <div className="p-3 sm:p-10 space-y-10">
        <Crousel />
        <Categories />
        <div className="cardsContainer space-y-5">
          <p className="font-extrabold text-primary">popular products</p>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
            <Card />
            <Card />
            <Card />
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
