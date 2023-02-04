import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

function Product({ id, image, name, price, type, option }) {
  // const [option, setOption] = useState(false);
  return (
    <Link href={`/detail/${id}`}>
      <div className="lg:min-w-[25%] md:min-w-[33.33%] sm:min-w-[50%]  min-w-[100%] relative">
        <div
          key={id}
          id="itemCard"
          className="hover:shadow-2xl rounded-3xl mx-[6px] bg-[#323232] pb-9 pt-12 sliderCard flex flex-col items-center h-full"
        >
          <div className="pb-2">
            <img
              className="object-contain max-w-[95%] m-auto"
              src={image}
              alt=""
            />
          </div>
          <div className="pb-2 w-5/6 text-center">{name}</div>
          <div className="font-medium text-lg">{price}₫</div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
