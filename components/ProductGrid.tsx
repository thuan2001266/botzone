import Link from "next/link";

function ProductGrid({ id, image, name, price, type }) {
    return (
        <Link href={`/detail/${id}`}>
            <div className="w-full">
                <div
                    key={id}
                    id="itemCard"
                    className="hover:shadow-2xl rounded-3xl mx-[6px] my-[8px] bg-[#323232] pb-9 pt-12 sliderCard flex flex-col items-center " //
                >
                    <div className="">
                        <img className="object-contain" src={image} alt="" />
                    </div>
                    <div className="py-7">{name}</div>
                    <div>{price}₫</div>
                </div>
            </div>
        </Link>
    );
}

export default ProductGrid;
