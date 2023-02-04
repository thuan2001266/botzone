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

  const productIdArr: Array<string> = state.cart.reduce(
    (result: Array<string>, curr: toCart) => {
      result.push(curr.id);
      return result;
    },
    []
  );
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(`http://localhost:8080/api/product/cart`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          listCart: productIdArr,
        }),
      });
      const data = await response.json();
      console.log(data.data);

      setProductCart(data.data);
      if (state.token != "") {
        console.log("sum cart: ");
        console.log(state.cart);
        console.log();

        setSum(
          state.cart.reduce((s: number, e: toCart) => {
            return (
              s +
              Number(e.quant) *
                Number(
                  data.data
                    .find((ein) => (ein.id = e.id))
                    .price[e.spec].replaceAll(".", "")
                )
            );
          }, 0)
        );
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (productCart.length > 0) {
      setSum(
        state.cart.reduce((s: number, e: toCart) => {
          return (
            s +
            Number(e.quant) *
              Number(
                productCart
                  .find((ein) => (ein.id = e.id))
                  .price[e.spec].replaceAll(".", "")
              )
          );
        }, 0)
      );
    }
  }, [state.cart]);

  const removeFromCart = (obj: toCart) => {
    dispatch(actions.removeFromCart(obj));
  };

  const editQuan = (obj: changeQuanCart) => {
    dispatch(actions.editQuanInCart(obj));
  };

  const purchase = () => {
    const listProduct = state.cart;
    const user = state.info.sub;
    let method = ref.current.checked ? "store" : "home";
    const addReceipt = async () => {
      const response = await fetch(`http://localhost:8080/api/addReceipt`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          accept: "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list: listProduct,
          user: user,
          method: method,
        }),
      });
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
              <div className="w-1/2 bg-[#ffffff] m-auto rounded-2xl shadow-xl ">
                <div>
                  {state.cart &&
                    state.cart.map((p: toCart) => {
                      const itemData = productCart.find((obj) => {
                        return obj.id == p.id;
                      });
                      if (itemData)
                        return (
                          <div
                            className="flex w-full px-5 pt-4 text-black"
                            key={p.id}
                          >
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
                            <div className="flex-1 px-7">
                              Tên sản phẩm: {itemData.name}
                            </div>
                            <div>
                              <div className="flex">
                                Giá sản phẩm:{" "}
                                <div className="font-medium pl-2">
                                  {itemData.price[p.spec]}₫
                                </div>
                              </div>
                              <div>
                                <div className="my-3">Số lượng:</div>
                                <div className="flex space-x-3">
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
                        );
                    })}
                </div>
                <div className="px-5 mt-3 text-md justify-between flex text-black pb-7">
                  <div>Hình thức nhận hàng:</div>
                  <div className="flex space-x-3">
                    <input
                      ref={ref}
                      type="radio"
                      defaultChecked
                      value="atshop"
                      name="get"
                    />{" "}
                    <div className="ml-1">Nhận tại cửa hàng</div>
                    <input type="radio" value="athome" name="get" />{" "}
                    <div className="ml-1">Giao tận nhà</div>
                  </div>
                </div>
                <div className="px-5 mt-3 text-lg font-medium justify-between flex text-black pb-7">
                  <div>Số sản phẩm: {productCart.length}</div>
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
