import Link from "next/link";
import { useState } from "react";

function ProductGrid({ id, image, name, price, type }) {
  return (
    <Link href={`/detail/${id}`}>
      <div className="w-full relative">
        <div
          key={id}
          id="itemCard"
          className="hover:shadow-2xl rounded-3xl mx-[6px] my-[8px] bg-[#323232] pb-9 pt-12 sliderCard flex flex-col items-center h-full" //
        >
          <div className="max-w-[95%]">
            <img className="object-contain" src={image} alt="" />
          </div>
          <div className="text-center py-3 w-5/6">{name}</div>
          <div>{price}₫</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductGrid;
