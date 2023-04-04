import Link from "next/link";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useStore, actions } from "../store";
function ProductGrid({
  id,
  image,
  name,
  price,
  link,
}: {
  id: string;
  image: string;
  name: string;
  price: string;
  link?: boolean;
}) {
  const [state, dispatch] = useStore();
  return (
    <>
      {link && link == true ? (
        <Link href={`/detail/${id}`}>
          <div className="w-full relative">
            <div
              key={id}
              id="itemCard"
              className="hover:shadow-2xl rounded-3xl mx-[6px] my-[8px] bg-[#323232] pb-9 pt-12 sliderCard flex flex-col items-center h-full" //
            >
              <div className="max-w-[95%] pb-2">
                <img className="object-contain" src={image} alt="" />
              </div>
              <div className="pb-2 w-5/6 text-center">{name}</div>
              <div className="font-medium text-lg">{price}₫</div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="w-full relative">
          <div
            key={id}
            id="itemCard"
            className="hover:shadow-2xl relative rounded-3xl mx-[6px] my-[8px] bg-[#323232] pb-9 pt-12 sliderCard flex flex-col items-center h-full" //
          >
            <div className="absolute top-0 right-0 p-2 flex">
              <div
                className="cursor-pointer px-3 hover:scale-110 transition-all"
                onClick={() => {
                  dispatch(
                    actions.setCRUDAction({
                      ...state.crud,
                      create: false,
                      delete: true,
                      update: false,
                      productId: id,
                      execute: false,
                    })
                  );
                  dispatch(actions.setPageLayer(!state.pageLayer));
                }}
              >
                <>
                  <DeleteIcon />
                </>
                <span>Xóa</span>
              </div>
              <div>|</div>
              <div
                className="cursor-pointer px-3 hover:scale-110 transition-all"
                onClick={() => {
                  dispatch(
                    actions.setCRUDAction({
                      ...state.crud,
                      create: false,
                      delete: false,
                      update: true,
                      productId: id,
                      execute: false,
                    })
                  );
                  dispatch(actions.setPageLayer(!state.pageLayer));
                }}
              >
                <>
                  <ChangeCircleIcon />
                </>
                <span>Sửa</span>
              </div>
            </div>
            <div className="max-w-[95%] pb-2">
              <img className="object-contain" src={image} alt="" />
            </div>
            <div className="pb-2 w-5/6 text-center">{name}</div>
            <div className="font-medium text-lg">{price}₫</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductGrid;
