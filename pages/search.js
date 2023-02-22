import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductGrid from "../components/ProductGrid";
import { actions, useStore } from "../store";

function Detail() {
    const [state, dispatch] = useStore();
    const [productBySearch, setProductBySearch] = useState([]);
    let message = state.search;

    useEffect(() => {
        const fetchResult = async () => {
            if (state.search != "") {
                const result = await fetch(
                    "https://botzone.herokuapp.com/" +`api/product/search/` + state.search,
                    {
                        method: "GET",
                        mode: "cors",
                        credentials: "same-origin",
                        headers: {
                            accept: "application/json",
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );
                const data = await result.json();
                if (data.data.length > 0) {
                    dispatch(
                        actions.setSearchMessage(
                            `Kết quả tìm kiếm của "` + state.search + `":`
                        )
                    );
                } else {
                    dispatch(
                        actions.setSearchMessage(
                            `Không tìm thấy sản phẩm với từ khóa "` +
                                state.search +
                                `"`
                        )
                    );
                }
                setProductBySearch(data.data);
            }
        };

        fetchResult();
    }, [state.reload]);
    return (
        <Layout>
            <Head>
                <title>Search</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="pt-5">
                <div className="flex justify-center items-center">
                    <h2 className="text-4xl">{}</h2>
                </div>
                <div>
                    <div className="w-4/5 m-auto">
                        <div>
                            {productBySearch ? (
                                <h2 className="text-xl ml-6 mt-3 mb-3">
                                    {state.searchMessage}
                                </h2>
                            ) : (
                                <h2 className="text-xl ml-6 my-20 text-center">
                                    {state.searchMessage}
                                </h2>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 m-auto gap-y-5">
                        {productBySearch ? (
                            productBySearch.map((product) => (
                                <ProductGrid
                                    key={product.id}
                                    id={product.id}
                                    image={product.img[0]}
                                    name={
                                        product.name + " " + product.optionToBuy[0]
                                    }
                                    price={product.price[0]}
                                    type={product.type}
                                />
                            ))
                        ) : (
                            <div>
                                <h2></h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Detail;
