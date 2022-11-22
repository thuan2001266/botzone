import Link from "next/link";

function Product({ id, image, name, price, type }) {
    return (
        <Link href={`/detail/${id}`}>
            <div className="lg:min-w-[25%] lg:w-[25%] md:min-w-[33.33%] md:w-[33.33%] sm:min-w-[50%] sm:w-[50%]">
                <div
                    key={id}
                    id="itemCard"
                    className="hover:shadow-2xl rounded-3xl mx-[6px] bg-[#323232] pb-9 pt-12 sliderCard flex flex-col items-center " //
                >
                    <div className="">
                        <img className="object-contain" src={image} alt="" />
                    </div>
                    <div className="py-7 w-5/6 text-center">{name}</div>
                    <div>{price}₫</div>
                </div>
            </div>
        </Link>
    );
}

export default Product;
