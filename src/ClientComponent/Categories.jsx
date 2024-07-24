import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

function Categories({ showHeading = false }) {
  return (
    <>
      <div className="categories space-y-5">
        <p
          className={cn(
            "font-extrabold text-primary",
            showHeading ? "hidden" : "block"
          )}
        >
          shop by categories
        </p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {/* <div className="flex items-center gap-4">
            <Jumper size="60" color="#16a34a" unit="px" duration="1s" />
          </div> */}
          <Link href="/{cat.categoryName}" className="group">
            <Card className="bg-primary/15 py-4 px-8 group-hover:bg-primary transition-all">
              <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
                <img
                  src="catgory image"
                  alt={"cat.categoryName"}
                  className="group-hover:scale-125 w-12 h-12 object-cover"
                />
                <p className="font-semibold group-hover:text-white transition-all">
                  {"cat.categoryName"}
                </p>
              </CardContent>
            </Card>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Categories;
