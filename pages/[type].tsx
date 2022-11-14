import Head from "next/head";
import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import AppleIcon from "@mui/icons-material/Apple";
import Layout from "../components/Layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Products } from "../interface";

export const getStaticPaths = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    const temppaths = data.message.map((a) => {
        return a.type;
    });

    const temppaths2 = [...new Set(temppaths)];

    const paths = temppaths2.map((p) => {
        return {
            params: {
                type: p.toString(),
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const type = context.params.type;

    let productType = "";

    switch (type) {
        case "iphone":
            productType = "iPhone";
            break;
        case "ipad":
            productType = "iPad";
            break;
        case "mac":
            productType = "Mac";
            break;
        case "watch":
            productType = "Watch";
            break;
        default:
            productType = "Error";
            break;
    }

    const res = await fetch(`http://localhost:3000/api/products/` + type);
    const data = await res.json();

    let typeList = [...new Set(data.message.map((dat: Products) => dat.model))];

    return {
        props: {
            product: data.message,
            typeList: typeList,
            productType: productType,
        },
    };
};

function type({ product, typeList, productType }) {
    const [type, setType] = useState("Tất cả");
    const [order, setOrder] = useState("Mới ra mắt");
    const [orderScreen, setOrderScreen] = useState(false);
    const [productData, setProductData] = useState<Products[]>(product);

    useEffect(() => {
        if (!typeList.includes(type)) {
            setType("Tất cả");
        }
        if (type !== "Tất cả") {
            let filteredProduct = product.filter(
                (pro: Products) => pro.model === type
            );
            setProductData(filteredProduct);
        } else {
            setProductData(product);
        }
        return () => {
            setOrderScreen(false);
        };
    }, [type, product]);

    return (
        <div>
            <Head>
                <title>BotZone</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="pt-5">
                    <div className="flex justify-center items-center">
                        <div>
                            <AppleIcon className="text-4xl" />
                        </div>
                        <h2 className="text-4xl">{productType}</h2>
                    </div>
                    <div className="w-4/5 m-auto py-5 flex justify-start">
                        <ul className="flex space-x-7">
                            <li
                                onClick={() => setType("Tất cả")}
                                className="cursor-pointer"
                            >
                                Tất cả
                            </li>
                            {typeList.map((typelist) => (
                                <li
                                    className="cursor-pointer"
                                    key={typelist}
                                    onClick={() => setType(typelist)}
                                >
                                    {typelist}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div
                            className="w-4/5 justify-end flex m-auto cursor-pointer relative select-none"
                            onClick={() => {
                                setOrderScreen((prev) => !prev);
                            }}
                        >
                            Xếp theo: {order}
                            <div>
                                {orderScreen ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </div>
                            {orderScreen && (
                                <div className="absolute top-[110%] right-0 bg-white rounded-2xl text-black px-5 mt-3">
                                    <ul className="space-y-2 py-3">
                                        <li
                                            onClick={() =>
                                                setOrder("Mới ra mắt")
                                            }
                                        >
                                            Mới ra mắt
                                        </li>
                                        <li
                                            onClick={() => setOrder("Bán chạy")}
                                        >
                                            Bán chạy
                                        </li>
                                        <li
                                            onClick={() =>
                                                setOrder("Giá thấp đến cao")
                                            }
                                        >
                                            Giá thấp đến cao
                                        </li>
                                        <li
                                            onClick={() =>
                                                setOrder("Giá cao đến thấp")
                                            }
                                        >
                                            Giá cao đến thấp
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 m-auto">
                            {productData &&
                                productData.map((product) => (
                                    <ProductGrid
                                        key={product._id}
                                        id={product._id}
                                        image={product.img}
                                        name={product.name}
                                        price={product.price}
                                        type={product.type}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default type;
