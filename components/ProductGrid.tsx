import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

function ProductGrid({ id, image, name, price, type }) {
    const [option, setOption] = useState(false);

    return (
        <div className="w-full relative">
            <div className="absolute top-3 right-0 rounded-2xl px-5 mt-3 z-10 w-max flex flex-col text-right justify-end">
                <div onClick={() => setOption((prev) => !prev)}>
                    <MoreVertIcon />
                </div>
                {option && (
                    <ul className="space-y-2 py-3 text-white text-right bg-[#3e3e3f] rounded-xl px-3">
                        <li className="cursor-pointer">Xóa sản phẩm</li>
                        <li className="cursor-pointer">Chỉnh sửa sản phẩm</li>
                    </ul>
                )}
            </div>
            <Link href={`/detail/${id}`}>
                <div
                    key={id}
                    id="itemCard"
                    className="hover:shadow-2xl rounded-3xl mx-[6px] my-[8px] bg-[#323232] pb-9 pt-12 sliderCard flex flex-col items-center " //
                >
                    <div className="">
                        <img className="object-contain" src={image} alt="" />
                    </div>
                    <div className="text-center py-7 w-5/6">{name}</div>
                    <div>{price}₫</div>
                </div>
            </Link>
        </div>
    );
}

export default ProductGrid;
