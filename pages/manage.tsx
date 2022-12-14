import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { ProductItem, Products } from "../interface";
import { useStore, actions } from "../store";
export async function getServerSideProps() {
    const result = await fetch(`http://localhost:8080/api/product`);
    const data = await result.json();
    return { props: { products: data.data } };
}

function manage({ products }) {
    const [theData, setTheData] = useState(products);
    const [reFetch, setReFetch] = useState(false);

    const [state, dispatch] = useStore();

    const router = useRouter();

    const ref = useRef(null);
    const ref2 = useRef(null);

    const [message, setMessage] = useState();

    const [iId, setiId] = useState("");
    const [iName, setiName] = useState("");
    const [iPrice, setiPrice] = useState("");
    const [iColor, setiColor] = useState("");
    const [iImage, setiImage] = useState("");
    const [iOption, setiOption] = useState("");
    const [iType, setiType] = useState("");
    const [iModel, setiModel] = useState("");
    const [authorizationCheck, setAuthorizationCheck] = useState(false);

    useEffect(() => {
        if (state.info.roles && state.info.roles.includes("ROLE_ADMIN")) {
            setAuthorizationCheck(true);
        } else {
            setAuthorizationCheck(false);
        }
    }, []);

    const setInfo = (p: Products) => {
        setiId(p.id);
        setiName(p.name);
        setiPrice(p.price.join(", "));
        setiColor(p.color.join(", "));
        setiImage(p.img.join(", "));
        setiOption(p.option.join(", "));
        setiType(p.type);
        setiModel(p.model);
    };

    const ExecuteAction = async (e) => {
        e.preventDefault();

        let destination = "";
        let method = "";
        if (ref.current.checked) {
            destination = "http://localhost:8080/api/manage/addProduct";
            method = "POST";
        } else {
            if (ref2.current.checked) {
                destination = "http://localhost:8080/api/manage/updateProduct";
                method = "POST";
            } else {
                destination = "http://localhost:8080/api/manage/deleteProduct";
                method = "POST";
            }
        }

        const fetchCart = async () => {
            const response = await fetch(destination, {
                method: method,
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Nauht " + state.token,
                },
                body: new URLSearchParams({
                    id: iId,
                    name: iName,
                    price: iPrice,
                    color: iColor,
                    image: iImage,
                    option: iOption,
                    type: iType,
                    model: iModel,
                }),
            });
            let data;
            try {
                data = await response.json();
                setMessage(data.message);

                fetch("http://localhost:8080/api/product")
                    .then((response) => response.json())
                    .then((data) => setTheData(data.data));
                // const reFetchData = async () => {
                //     const result = await fetch(
                //         `http://localhost:8080/api/product`
                //     );
                //     const data = await result.json();
                //     console.log(data);

                //     setTheData(data.data);
                // };
                // console.log("refetch");

                // reFetchData;
            } catch (e) {
                console.log(e);
            }
        };

        fetchCart();
        setReFetch((prev) => !prev);
    };

    return (
        <div className="w-[100%] flex m-auto">
            <div className="w-[100%] m-auto grid h-screen w-full place-items-center">
                <Link href="/">
                    <div className="cursor-pointer my-2">Quay v??? trang ch???</div>
                </Link>
                {authorizationCheck ? (
                    <div className="m-auto flex space-x-6">
                        <div className="w-[500px]">
                            <form action="">
                                <div>
                                    <div>T??n</div>
                                    <input
                                        value={iName}
                                        onChange={(e) =>
                                            setiName(e.target.value)
                                        }
                                        type="text"
                                        className="text-black px-2 py-1 rounded-md mb-2 w-full"
                                    />
                                </div>
                                <div>
                                    <div>Gi??</div>
                                    <input
                                        value={iPrice}
                                        onChange={(e) =>
                                            setiPrice(e.target.value)
                                        }
                                        type="text"
                                        className="text-black px-2 py-1 rounded-md mb-2 w-full"
                                    />
                                </div>
                                <div>
                                    <div>M??u</div>
                                    <input
                                        value={iColor}
                                        onChange={(e) =>
                                            setiColor(e.target.value)
                                        }
                                        type="text"
                                        className="text-black px-2 py-1 rounded-md mb-2 w-full"
                                    />
                                </div>
                                <div>
                                    <div>H??nh ???nh</div>
                                    <textarea
                                        value={iImage}
                                        onChange={(e) =>
                                            setiImage(e.target.value)
                                        }
                                        cols="3"
                                        className="text-black px-2 py-1 rounded-md mb-2 w-full"
                                    />
                                </div>
                                <div>
                                    <div>T??y ch???n</div>
                                    <input
                                        value={iOption}
                                        onChange={(e) =>
                                            setiOption(e.target.value)
                                        }
                                        type="text"
                                        className="text-black px-2 py-1 rounded-md mb-2 w-full"
                                    />
                                </div>
                                <div>
                                    <div>Ph??n lo???i</div>
                                    <input
                                        value={iType}
                                        onChange={(e) =>
                                            setiType(e.target.value)
                                        }
                                        type="text"
                                        className="text-black px-2 py-1 rounded-md mb-2 w-full"
                                    />
                                </div>
                                <div>
                                    <div>Phi??n b???n</div>
                                    <input
                                        value={iModel}
                                        onChange={(e) =>
                                            setiModel(e.target.value)
                                        }
                                        type="text"
                                        className="text-black px-2 py-1 rounded-md mb-2 w-full"
                                    />
                                </div>
                                <div>
                                    <div>Th???c hi???n</div>
                                    <div className="flex flex-col">
                                        <div className="flex">
                                            <input
                                                className="text-black px-2 py-1 rounded-md mb-2"
                                                type="radio"
                                                defaultChecked
                                                value="add"
                                                name="action"
                                                id="actionType"
                                                ref={ref}
                                            />{" "}
                                            <div className="ml-1">
                                                Th??m s???n ph???m
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <input
                                                className="text-black px-2 py-1 rounded-md mb-2"
                                                type="radio"
                                                value="update"
                                                name="action"
                                                id="actionType2"
                                                ref={ref2}
                                            />{" "}
                                            <div className="ml-1">
                                                S???a s???n ph???m
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <input
                                                className="text-black px-2 py-1 rounded-md mb-2"
                                                type="radio"
                                                value="delete"
                                                name="action"
                                                id="actionType3"
                                            />{" "}
                                            <div className="ml-1">
                                                Xo??a s???n ph???m
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {message && <div className="">{message}</div>}
                                <div>
                                    <button
                                        onClick={ExecuteAction}
                                        className="bg-[#0071e3] rounded-lg px-3 py-1 mt-2"
                                        id="submitButton"
                                    >
                                        X??c nh???n
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h2>Danh s??ch s???n ph???m:</h2>
                            <div className="h-screen overflow-y-scroll">
                                <div className="bg-[#ffffff] rounded-2xl shadow-xl">
                                    <div>
                                        {theData &&
                                            theData.map((p: Products) => (
                                                <div
                                                    className="flex w-full px-5 pt-4 text-black"
                                                    key={p.id}
                                                    onClick={() => setInfo(p)}
                                                >
                                                    <div className="flex flex-col justify-center">
                                                        <div className="w-[90px] object-contain">
                                                            <img
                                                                src={p.img[0]}
                                                                alt=""
                                                            />
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
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid h-screen w-full place-items-center text-center">
                        <div className="mb-24">
                            <h3 className="text-2xl">
                                B???n kh??ng c?? ????? quy???n ????? truy c???p v??o ???????ng link
                                n??y!!
                            </h3>
                            <div className="flex justify-center mt-3">
                                <div>Chuy???n ?????n trang</div>
                                <Link href={"/login"}>
                                    <div className="font-medium text-lg cursor-pointer ml-1">
                                        ????ng nh???p.
                                    </div>
                                </Link>
                            </div>
                            <div className="flex justify-center mt-2">
                                <div>Ho???c quay v???</div>
                                <Link href={"/"}>
                                    <div className="font-medium text-lg cursor-pointer ml-1">
                                        trang ch???.
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default manage;
