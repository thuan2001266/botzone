import Layout from "../components/Layout";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import { useStore, actions } from "../store";
import { useEffect, useRef, useState } from "react";
import {
  changeQuanCart,
  ProductAndQuantity,
  Products,
  toCart,
} from "../interface";
import { clearCart, setCart } from "../store/action";
import Header from "../components/Header";

function Cart() {
  const [state, dispatch] = useStore();
  const [productCart, setProductCart] = useState<Array<Products>>([]);
  const [sum, setSum] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const ref = useRef(null);

  //fetch data by list of id
  useEffect(() => {
    //list of cart product id
    const productIdArr: Array<string> = state.cart.reduce(
      (result: Array<string>, curr: toCart) => {
        if (!result.includes(curr.id)) {
          result.push(curr.id);
        }
        return result;
      },
      []
    );

    const fetchCart = async () => {
      const response = await fetch(
        `https://botzone.herokuapp.com/api/product/cart`,
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            listCart: productIdArr.join(","),
          }),
        }
      );
      const data = await response.json();
      setProductCart(data.data);
      if (state.token != "") {
        setSum(
          state.cart.reduce((s: number, e: toCart) => {
            return (
              s +
              Number(e.quant) *
                Number(
                  data.data
                    .find((ein: Products) => ein.id == e.id)
                    .price[e.spec].replaceAll(".", "")
                )
            );
          }, 0)
        );
      }
    };
    if (productIdArr && productIdArr.length > 0) {
      fetchCart();
    }
  }, []);

  //sum of price
  useEffect(() => {
    if (productCart && productCart.length > 0) {
      setSum(
        state.cart.reduce((s: number, e: toCart) => {
          return (
            s +
            Number(e.quant) *
              Number(
                productCart
                  ?.find((ein: Products) => ein.id == e.id)
                  ?.price[e.spec].replaceAll(".", "")
              )
          );
        }, 0)
      );
    }
  }, [state.cart]);

  // //remove from cart
  const removeFromCart = (obj: toCart) => {
    dispatch(actions.removeFromCart(obj));
  };

  // //change quantity
  const editQuan = (obj: changeQuanCart) => {
    dispatch(actions.editQuanInCart(obj));
  };

  // //purchase
  const purchase = () => {
    const listProduct = state.cart;
    const user = state.info.sub;
    let method = "store";
    if (ref.current) {
      const tempRef: HTMLInputElement = ref.current;
      method = tempRef.checked ? "store" : "home";
    }

    const addReceipt = async () => {
      const response = await fetch(
        `https://botzone.herokuapp.com/api/addReceipt`,
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
    <>
      <Header></Header>
      {state.token != "" ? (
        <div className="h-screen bg-[#f0f0f0]">
          {done ? (
            <div className="grid h-screen place-items-center text-center">
              <div className="mb-24 text-black">
                <h3 className="text-2xl">Bạn đã thanh toán thành công!</h3>
                <div className="flex justify-center">
                  <Link href={"/"}>
                    <div className="font-medium text-lg cursor-pointer ml-1">
                      Tiếp tục mua sắm
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : state.cart.length != 0 ? (
            <div className="w-full h-fit m-auto bg-[#f0f0f0] text-[#897560]">
              <div className="w-4/5 md:w-3/5 lg:w-2/3 m-auto flex justify-between py-2">
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
              <div className="w-4/5 md:w-3/5 lg:w-2/3 bg-[#ffffff] m-auto rounded-2xl shadow-xl ">
                <div>
                  {state.cart &&
                    state.cart.map((p: toCart) => {
                      const itemData = productCart.find((obj) => {
                        return obj.id == p.id;
                      });
                      if (itemData) {
                        return (
                          <div
                            key={
                              p.id + "" + p.color + "" + p.quant + "" + p.spec
                            }
                            className="flex w-full px-5 pt-4 text-black"
                          >
                            {/* image + delete button */}
                            <div className="flex flex-col justify-center">
                              <div className="w-[90px] object-contain">
                                <img src={itemData.img[p.color]} alt="" />
                              </div>
                              <div
                                className="text-center "
                                onClick={() => removeFromCart(p)}
                              >
                                <span className="cursor-pointer">Xóa</span>
                              </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between w-full">
                              {/* product name + spec */}
                              <div className="flex-1 md:px-7">
                                <div>
                                  Tên sản phẩm:{" "}
                                  <span className="font-medium">
                                    {itemData.name}
                                  </span>
                                </div>
                                <div>
                                  Thông tin:{" "}
                                  <span className="font-medium">
                                    {itemData.optionToBuy[p.spec] +
                                      " | " +
                                      itemData.color[p.color]}
                                  </span>
                                </div>
                              </div>
                              {/* price + quantity */}
                              <div className="md:px-7 pt-2 md:pt-0">
                                <div className="flex">
                                  Giá sản phẩm:{" "}
                                  <div className="font-medium pl-2">
                                    {itemData.price[p.spec]}₫
                                  </div>
                                </div>
                                <div className="flex my-3">
                                  <div className="">Số lượng:</div>
                                  <div className="flex space-x-2 ml-2">
                                    <div
                                      onClick={() =>
                                        editQuan({ object: p, action: "sub" })
                                      }
                                      className="cursor-pointer border border-solid w-5 text-center rounded-sm"
                                    >
                                      -
                                    </div>
                                    <div className="border-solid w-5 text-center rounded-sm border bg-[#f5f5f7]">
                                      {p.quant}
                                    </div>
                                    <div
                                      onClick={() =>
                                        editQuan({ object: p, action: "add" })
                                      }
                                      className="cursor-pointer border border-solid w-5 text-center rounded-sm"
                                    >
                                      +
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
                <div className="px-5 mt-0 md:mt-3 text-lg font-medium justify-between flex text-black pb-7 flex-col sm:flex-row">
                  <div>
                    Số sản phẩm:{" "}
                    {state.cart.reduce((productNum: number, curr: toCart) => {
                      return productNum + curr.quant;
                    }, 0)}
                  </div>
                  <div className="flex">
                    Tổng tiền:{" "}
                    <div className="text-red-600 ml-2">
                      {sum.toLocaleString("en-US").replaceAll(",", ".")}₫
                    </div>
                  </div>
                </div>
                <div
                  onClick={purchase}
                  className="w-[100%] flex items-center justify-center px-5 py-4 rounded-b-2xl mt-3 bg-[#0071e3] cursor-pointer text-black"
                >
                  <div className="text-lg font-semibold ">Thanh toán</div>
                </div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="grid h-screen place-items-center text-center text-black">
              <div className="mb-24">
                <h3 className="text-2xl">Giỏ hàng của bạn đang trống</h3>
                <div className="flex justify-center">
                  Chuyển đến
                  <Link href={"/"}>
                    <div className="font-medium text-lg cursor-pointer ml-1">
                      trang chủ
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid h-screen place-items-center text-cente text-blackr">
          <div className="mb-24">
            <h3 className="text-2xl">Bạn cần đăng nhập để xem giỏ hàng!</h3>
            <div className="flex justify-center">
              Chuyển đến trang
              <Link href={"/login"}>
                <div className="font-medium text-lg cursor-pointer ml-1">
                  đăng nhập.
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
