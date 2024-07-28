import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

function Categories({ category }) {
  return (
    <>
      <div className="categories space-y-5">
        <Link to={`/category/${category.categoryName}`} className="group">
          <Card className="bg-primary/15 py-4 px-8 group-hover:bg-primary transition-all">
            <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
              <LazyLoadImage
                src={category.categoryImage}
                alt={category.categoryName}
                placeholderSrc={`https://res.cloudinary.com/dfyfnvmtr/image/upload/w_100/e_blur:10000,q_1,f_auto/${category.categoryImage.slice(
                  category.categoryImage.indexOf("upload/") + 7
                )}`}
                effect="blur"
                className="group-hover:scale-125"
              />
              <p className="font-semibold group-hover:text-white transition-all">
                {category.categoryName}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
}

export default Categories;
