import Layout from "../components/Layout";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import { useStore, actions } from "../store";
import { useEffect, useRef, useState } from "react";
import { ProductAndQuantity, Products } from "../interface";
import { clearCart, setCart } from "../store/action";

function cart() {
    const [state, dispatch] = useStore();
    const [productCart, setProductCart] = useState<Array<Products>>([]);
    const [sum, setSum] = useState<number>(0);
    const [done, setDone] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch(
                `http://localhost:8080/api/product/cart`,
                {
                    method: "POST",
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    // headers: {
                    //     "Content-Type": "application/json",
                    // },
                    // body: JSON.stringify(state.cart),
                    body: new URLSearchParams({
                        listCart: state.cart,
                    }),
                }
            );
            const data = await response.json();
            setProductCart(data.data);
            if (state.token != "") {
                setSum(
                    data.data.reduce(
                        (a: number, e: Products) =>
                            a + Number(e.price[0].replaceAll(".", "")),
                        0
                    )
                );
            }

            // setProductQuantity(
            //     data.data.map((e) => {
            //         return { product: e, quantity: 1 };
            //     })
            // );
        };

        fetchCart();
    }, []);

    const purchase = () => {
        const listProduct = state.cart;
        const user = state.info.sub;
        let method = ref.current.checked ? "store" : "home";
        const addReceipt = async () => {
            const response = await fetch(
                `http://localhost:8080/api/addReceipt`,
                {
                    method: "POST",
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        list: listProduct,
                        user: user,
                        method: method,
                    }),
                }
            );
        };
        addReceipt();
        dispatch(clearCart());
        setDone(true);
    };

    return (
        <Layout>
            {state.token != "" ? (
                <div>
                    {done ? (
                        <div className="grid h-screen place-items-center text-center">
                            <div className="mb-24">
                                <h3 className="text-2xl">
                                    B???n ???? thanh to??n th??nh c??ng!
                                </h3>
                                <div className="flex justify-center">
                                    <Link href={"/"}>
                                        <div className="font-medium text-lg cursor-pointer ml-1">
                                            Ti???p t???c mua s???m
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full m-auto bg-[#f0f0f0] h-screen text-[#897560]">
                            <div className="w-1/2 m-auto flex justify-between py-2">
                                <Link href={"/"}>
                                    <div className="ml-2 flex cursor-pointer">
                                        <div>
                                            <ArrowLeftIcon />
                                        </div>
                                        Ti???p t???c mua s???m
                                    </div>
                                </Link>
                                <div className="mr-2">Gi??? h??ng:</div>
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
                                                        <img
                                                            src={p.img[0]}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        X??a
                                                    </div>
                                                </div>
                                                <div className="flex-1 px-7">
                                                    T??n s???n ph???m: {p.name}
                                                </div>
                                                <div>
                                                    <div className="flex">
                                                        Gi?? s???n ph???m:{" "}
                                                        <div className="font-medium pl-2">
                                                            {p.price[0]}???
                                                        </div>
                                                    </div>
                                                    {/* <div>
                                        <div className="my-3">
                                            S??? l?????ng:
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
                                    <div>H??nh th???c nh???n h??ng:</div>
                                    <div className="flex space-x-3">
                                        <input
                                            ref={ref}
                                            type="radio"
                                            defaultChecked
                                            value="atshop"
                                            name="get"
                                        />{" "}
                                        <div className="ml-1">
                                            Nh???n t???i c???a h??ng
                                        </div>
                                        <input
                                            type="radio"
                                            value="athome"
                                            name="get"
                                        />{" "}
                                        <div className="ml-1">Giao t???n nh??</div>
                                    </div>
                                </div>
                                <div className="px-5 mt-3 text-lg font-medium justify-between flex text-black pb-7">
                                    <div>S??? s???n ph???m: {productCart.length}</div>
                                    <div className="flex">
                                        T???ng ti???n:{" "}
                                        <div className="text-red-600 ml-2">
                                            {sum}???
                                        </div>
                                    </div>
                                </div>
                                <div
                                    onClick={purchase}
                                    className="w-[100%] flex items-center justify-center px-5 py-4 rounded-b-2xl mt-3 bg-[#0071e3] cursor-pointer text-black"
                                >
                                    <div className="text-lg font-semibold ">
                                        Thanh to??n
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid h-screen place-items-center text-center">
                    <div className="mb-24">
                        <h3 className="text-2xl">
                            B???n c???n ????ng nh???p ????? xem gi??? h??ng!
                        </h3>
                        <div className="flex justify-center">
                            Chuy???n ?????n trang
                            <Link href={"/login"}>
                                <div className="font-medium text-lg cursor-pointer ml-1">
                                    ????ng nh???p.
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default cart;
