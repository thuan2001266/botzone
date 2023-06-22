import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ManagePopUp from "../components/ManagePopUp";
import ProductList from "../components/ProductList";
import { ProductItem, Products, TypeVar } from "../interface";
import { useStore, actions } from "../store";
import { log } from "console";
export async function getServerSideProps() {
  const result = await fetch("https://botzone.onrender.com/" + `api/product`);
  const data = await result.json();
  return { props: { products: data.data } };
}

function Manage({ products }: { products: Products[] }) {
  let typeListAll: string[] = [];
  const [state, dispatch] = useStore();
  const router = useRouter();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [theData, setTheData] = useState(products);
  const [reFetch, setReFetch] = useState(false);
  const [message, setMessage] = useState("");
  const [iId, setiId] = useState("");
  const [iName, setiName] = useState("");
  const [iPrice, setiPrice] = useState("");
  const [iColor, setiColor] = useState("");
  const [iImage, setiImage] = useState("");
  const [iOption, setiOption] = useState("");
  const [iType, setiType] = useState("");
  const [iModel, setiModel] = useState("");
  const [authorizationCheck, setAuthorizationCheck] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [targetProduct, setTargetProduct] = useState<Products>({
    id: "",
    name: "",
    price: [],
    color: [],
    img: [],
    optionToBuy: [],
    discount: "",
    date: -1,
    type: "iphone",
    model: "",
  });

  useEffect(() => {
    setIsMounted(state.pageLayer);
  }, [state.pageLayer]);

  products.map((e) => {
    if (!typeListAll.includes(e.model)) typeListAll.push(e.model);
  });

  const typeVar: TypeVar = {
    iphone: [],
    mac: [],
    ipad: [],
    watch: [],
    accessory: [],
  };
  products.map((e) => {
    switch (e.type) {
      case "iphone":
        if (!typeVar.iphone.includes(e.model)) {
          typeVar.iphone.push(e.model);
        }
        break;
      case "mac":
        if (!typeVar.mac.includes(e.model)) {
          typeVar.mac.push(e.model);
        }
        break;
      case "ipad":
        if (!typeVar.ipad.includes(e.model)) {
          typeVar.ipad.push(e.model);
        }
        break;
      case "watch":
        if (!typeVar.watch.includes(e.model)) {
          typeVar.watch.push(e.model);
        }
        break;
      case "accessory":
        if (!typeVar.accessory.includes(e.model)) {
          typeVar.accessory.push(e.model);
        }
        break;
    }
  });
  useEffect(() => {
    if (state.info.roles && state.info.roles.includes("ROLE_ADMIN")) {
      setAuthorizationCheck(true);
    } else {
      setAuthorizationCheck(false);
    }
  }, []);

  useEffect(() => {
    const popupType = state.crud.create
      ? "create"
      : state.crud.delete
      ? "delete"
      : "update";
    const selectedProduct = theData.filter(
      (e) => e.id == state.crud.productId
    )[0];
    if (!state.crud.create && !state.crud.delete && !state.crud.update) {
      // setPopUpType(popupType);
      // setTargetProduct({
      //   id: "",
      //   name: "",
      //   price: [],
      //   color: [],
      //   img: [],
      //   optionToBuy: [],
      //   discount: "",
      //   date: -1,
      //   type: "",
      //   model: "",
      // });
    } else {
      if (state.crud.execute) {
        const fetchCart = async () => {
          // console.log({
          //   id: state.crud.productId,
          //   name: state.crud.productInfo.name,
          //   price: state.crud.productInfo.price.join(","),
          //   color: state.crud.productInfo.color.join(","),
          //   image: state.crud.productInfo.img.join(","),
          //   option: state.crud.productInfo.optionToBuy.join(","),
          //   type: state.crud.productInfo.type,
          //   model: state.crud.productInfo.model,
          //   date: state.crud.productInfo.date,
          // });

          const response = await fetch(
            `https://botzone.onrender.com/api/manage/${popupType}Product`,
            {
              method: "POST",
              mode: "cors",
              credentials: "same-origin",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Nauht " + state.token,
              },
              body: new URLSearchParams({
                id: state.crud.productId,
                name: state.crud.productInfo.name,
                price: state.crud.productInfo.price.join(","),
                color: state.crud.productInfo.color.join(","),
                image: state.crud.productInfo.img.join(","),
                option: state.crud.productInfo.optionToBuy.join(","),
                type: state.crud.productInfo.type,
                model: state.crud.productInfo.model,
                date: state.crud.productInfo.date,
              }),
            }
          );
          let data = await response.json();
          if (data.code != 0) {
            setTheData(data.data);
            dispatch(
              actions.setCRUDAction({
                ...state.crud,
                execute: false,
                productInfo: {
                  id: "",
                  name: "",
                  price: [],
                  color: [],
                  img: [],
                  optionToBuy: [],
                  discount: "",
                  date: -1,
                  type: "",
                  model: "",
                },
              })
            );
          } else {
            console.log(data.message);
          }
        };
        fetchCart();
      } else {
        setPopUpType(popupType);
        if (selectedProduct) {
          setTargetProduct(selectedProduct);
        } else {
          setTargetProduct({
            id: "",
            name: "",
            price: [],
            color: [],
            img: [],
            optionToBuy: [],
            discount: "",
            date: -1,
            type: "iphone",
            model: "",
          });
        }
      }
    }
  }, [state.crud]);

  //old CRUD here
  const ExecuteAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let destination = "";
    let method = "";

    if (ref.current && ref2.current) {
      const tempRef1: HTMLInputElement = ref.current;
      const tempRef2: HTMLInputElement = ref2.current;
      if (tempRef1.checked) {
        destination = "https://botzone.onrender.com/" + "api/manage/addProduct";
        method = "POST";
      } else {
        if (tempRef2.checked) {
          destination =
            "https://botzone.onrender.com/" + "api/manage/updateProduct";
          method = "POST";
        } else {
          destination =
            "https://botzone.onrender.com/" + "api/manage/deleteProduct";
          method = "POST";
        }
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
        console.log(data);

        setMessage(data.message);

        if (
          data &&
          data.error_message &&
          data.error_message.includes("The Token has expired")
        ) {
          const refreshToken = await fetch(
            "https://botzone.onrender.com/api/refreshToken",
            {
              method: "GET",
              mode: "cors",
              credentials: "same-origin",
              headers: {
                Accept: "application/json",
                Authorization: "Nauht " + state.refreshToken,
              },
            }
          );
          const newToken = await refreshToken.json();
          if (newToken.access_token) {
            dispatch(actions.setToken(newToken.access_token));
            dispatch(actions.setRefreshToken(newToken.refresh_token));
            setMessage("Phiên đăng nhập vừa được làm mới!");
          }
        } else {
          fetch("https://botzone.onrender.com/" + "api/product")
            .then((response) => response.json())
            .then((data) => setTheData(data.data));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCart();
    setReFetch((prev) => !prev);
  };

  return (
    <div className="relative">
      <Head>
        <title>Manage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* popup window */}
      <div
        onClick={() => {
          {
            dispatch(actions.setPageLayer(!state.pageLayer));
            setPopUpType("");
          }
        }}
        className={`fixed w-full h-full bg-[#0c0c0d] z-40 ${
          isMounted
            ? "opacity-75 transition-all duration-1000 ease-out"
            : "opacity-0"
        } ${state.pageLayer ? "visible" : "hidden"}`}
      ></div>
      {state.pageLayer ? (
        <ManagePopUp popType={popUpType} product={targetProduct} />
      ) : (
        <></>
      )}

      <div className="w-[94%] flex m-auto">
        <div className=" m-auto grid h-screen w-full place-items-center">
          <Link href="/">
            <div className="cursor-pointer my-2">Quay về trang chủ</div>
          </Link>
          {authorizationCheck ? (
            <div className="m-auto flex space-x-6">
              <div>
                <div
                  className="text-center mb-6 w-28  border px-2 py-1 border-white rounded-lg cursor-pointer hover:scale-105 transition-all hover:bg-[#0071e3] hover:border-[#0071e3] hover:text-white"
                  onClick={() => {
                    dispatch(
                      actions.setCRUDAction({
                        create: true,
                        delete: false,
                        update: false,
                        productId: -1,
                        execute: false,
                        productInfo: {},
                      })
                    );
                    dispatch(actions.setPageLayer(!state.pageLayer));
                  }}
                >
                  <span className="text-center">Thêm sản phẩm</span>
                </div>
                <h2>Danh sách sản phẩm:</h2>
                <ProductList
                  product={theData}
                  typeList={typeListAll}
                  nolink={true}
                  typeAndModel={typeVar}
                ></ProductList>
              </div>
            </div>
          ) : (
            <div className="grid h-screen w-full place-items-center text-center">
              <div className="mb-24">
                <h3 className="text-2xl">
                  Bạn không có đủ quyền để truy cập vào đường link này!!
                </h3>
                <div className="flex justify-center mt-3">
                  <div>Chuyển đến trang</div>
                  <Link href={"/login"}>
                    <span className="font-medium text-lg cursor-pointer ml-1">
                      đăng nhập.
                    </span>
                  </Link>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="h-full mt-[2px]">Hoặc quay về</div>
                  <Link href={"/"}>
                    <span className="font-medium text-lg cursor-pointer ml-1 mb-1">
                      trang chủ.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manage;
