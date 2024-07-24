import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

function CardComponent() {
  return (
    <>
      <div className="card group">
        <Card className="p-5 cursor-pointer hover:shadow-[0px_0px_36px_-10px_black] transition-shado">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <img
              src=""
              alt={"product.productName"}
              className="w-[14.375rem] h-[14.375rem] object-cover"
            />
            <h2 className="text-[1.2rem] font-semibold line-clamp-1">
              {"product.productName"}
            </h2>
            <h2 className="text-[1.2rem] text-gray-600 font-semibold">
              ${"product.price"}
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
              <DialogContent className="fixed bg-white p-5 left-[50%] max-w-[700px] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex text-center sm:text-left gap-4 flex-col items-center sm:items-start justify-center sm:flex-row">
                  <div className="bg-slate-200 rounded-lg p-4 max-w-[300px]">
                    <img
                      src={"product.productImage"}
                      alt={"product.productName"}
                      className="w-[17.375rem] h-[17.375rem] object-cover"
                    />
                  </div>
                  <div className="description space-y-2">
                    <h2 className="font-bold text-xl">
                      {"product.productName"}
                    </h2>
                    <p className="text-gray-600">{"product.description"}</p>
                    <h2 className="font-bold text-2xl">${"product.price"}</h2>
                    <h2 className="font-bold text-lg">
                      quantity {"product.weight"}
                    </h2>
                    <div className="flex items-center justify-center flex-row sm:justify-start gap-3">
                      <div
                        className="flex border-2 p-2 rounded-sm text-lg font-semibold"
                        // on:click={increament}
                      >
                        <button>-</button>
                        <p className="w-28 text-center">{"itemCount"}</p>
                        <button>+</button>
                      </div>
                      <p className="font-bold text-2xl">= ${"price"}</p>
                    </div>
                    <Button
                      className="capitalize space-x-2"
                      //   disabled={loading ? true : false}
                      //   on:click={() => AddtoCard(product, price, itemCount)}
                    >
                      {/* <iconify-icon
                        icon="iconamoon:shopping-card-fill"
                        style="color: white"
                      ></iconify-icon> */}
                      <p>add to card</p>
                    </Button>
                    <p className="font-bold text-lg">
                      category:
                      <span className="font-semibold">{"category"}</span>
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
