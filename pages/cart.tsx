import Layout from "../components/Layout";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import { useStore, actions } from "../store";
import { useEffect, useState } from "react";
import { ProductAndQuantity, Products } from "../interface";

function cart() {
    const [state, dispatch] = useStore();
    const [productCart, setProductCart] = useState<Array<Products>>([]);
    // const [quan, setQuan] = useState<number>(1);
    const [sum, setSum] = useState<number>(0);

    // const [productQuantity, setProductQuantity] = useState<
    //     Array<ProductAndQuantity>
    // >([]);

    // const subQuan = () => {
    //     if (quan > 1) {
    //         setQuan((e) => {
    //             return e - 1;
    //         });
    //     } else {
    //     }
    // };
    // console.log(productCart);
    // console.log(
    // productQuantity.reduce(
    //     (a: number, e: ProductAndQuantity) =>
    //         a + e.product.price[0] * e.quantity,
    //     0
    // )
    // );

    // const addQuan = () => {
    //     setQuan((e) => {
    //         return e + 1;
    //     });
    // };

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch(
                `http://localhost:8080/api/product/cart`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(state.cart),
                }
            );
            const data = await response.json();
            setProductCart(data.data);
            setSum(
                data.data.reduce(
                    (a: number, e: Products) => a + Number(e.price[0]),
                    0
                )
            );
            // setProductQuantity(
            //     data.data.map((e) => {
            //         return { product: e, quantity: 1 };
            //     })
            // );
        };

        fetchCart();
    }, []);
    return (
        <Layout>
            <div className="w-full m-auto bg-[#f0f0f0] h-screen text-[#897560]">
                <div className="w-1/2 m-auto flex justify-between py-2">
                    <Link href={"/"}>
                        <div className="ml-2 flex cursor-pointer">
                            <div>
                                <ArrowLeftIcon />
                            </div>
                            Tiếp tục mua sắm
                        </div>
                    </Link>
                    <div className="mr-2">Giỏ hàng:</div>
                </div>
                <div className="w-1/2 bg-[#ffffff] m-auto rounded-2xl shadow-xl">
                    <div>
                        {productCart &&
                            productCart.map((p: Products) => (
                                <div
                                    className="flex w-full px-5 pt-4 text-black"
                                    key={p.id}
                                >
                                    <div className="flex flex-col justify-center">
                                        <div className="w-[90px] object-contain">
                                            <img src={p.img[0]} alt="" />
                                        </div>
                                        <div className="text-center">Xóa</div>
                                    </div>
                                    <div className="flex-1 px-7">
                                        Tên sản phẩm: {p.name}
                                    </div>
                                    <div>
                                        <div className="flex">
                                            Giá sản phẩm:{" "}
                                            <div className="font-medium pl-2">
                                                {p.price[0]}₫
                                            </div>
                                        </div>
                                        {/* <div>
                                            <div className="my-3">
                                                Số lượng:
                                            </div>
                                            <div className="flex space-x-3">
                                                <div
                                                    onClick={subQuan}
                                                    className="cursor-pointer border border-solid w-5 text-center rounded-sm"
                                                >
                                                    -
                                                </div>
                                                <div className="border-solid w-5 text-center rounded-sm border bg-[#f5f5f7]">
                                                    {quan}
                                                </div>
                                                <div
                                                    onClick={addQuan}
                                                    className="cursor-pointer border border-solid w-5 text-center rounded-sm"
                                                >
                                                    +
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="px-5 mt-3 text-md justify-between flex text-black pb-7">
                        <div>Hình thức nhận hàng:</div>
                        <div className="flex space-x-3">
                            <input
                                type="radio"
                                checked
                                value="atshop"
                                name="get"
                            />{" "}
                            <div className="ml-1">Nhận tại cửa hàng</div>
                            <input
                                type="radio"
                                value="athome"
                                name="get"
                            />{" "}
                            <div className="ml-1">Giao tận nhà</div>
                        </div>
                    </div>
                    <div className="px-5 mt-3 text-lg font-medium justify-between flex text-black pb-7">
                        <div>Số sản phẩm: {productCart.length}</div>
                        <div className="flex">
                            Tổng tiền:{" "}
                            <div className="text-red-600 ml-2">{sum}₫</div>
                        </div>
                    </div>
                    <div className="w-[100%] flex items-center justify-center px-5 py-4 rounded-b-2xl mt-3 bg-[#0071e3] cursor-pointer text-black">
                        <div className="text-lg font-semibold ">Thanh toán</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default cart;
