import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ProductItem, Products, toCart } from "../../interface";
import { useStore, actions } from "../../store";
import Image from "next/image";
export const getStaticPaths = async () => {
  const res = await fetch("https://botzone.onrender.com/" + "api/product");
  const data = await res.json();
  const paths = data.data.map((a: Products) => {
    return {
      params: {
        id: a.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const res = await fetch(
    "https://botzone.onrender.com/" + "api/product/" + id
  );
  const data = await res.json();
  return {
    props: { product: data.data[0] },
  };
};

function Detail({ product }: ProductItem) {
  const [state, dispatch] = useStore();
  const [infoToCart, setInfoToCart] = useState<toCart>({
    id: product.id,
    spec: 0,
    color: 0,
    quant: 1,
  });
  const addToCard = () => {
    dispatch(actions.setCart(infoToCart));
  };

  return (
    <Layout>
      <React.Fragment>
        <Head>
          <title>{product.name}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="w-4/5 m-auto flex pt-5 md:flex-row flex-col">
            <div className="md:w-1/2 w-full mr-3 relative">
              <div className="sticky">
                <img src={product.img[infoToCart.color]} alt="" />
              </div>
              <div></div>
            </div>
            <div className="md:w-1/2 w-full ml-2 md:mt-0 mt-6">
              <h1 className="text-4xl font-extrabold">{product.name}</h1>
              <h2 className="text-3xl font-bold mt-3">
                {product.price[infoToCart.spec]}₫
              </h2>
              <div>
                {product.optionToBuy.length > 0 &&
                product.optionToBuy[0] != "" ? (
                  <>
                    <div className="my-3 flex">
                      Tùy chọn:
                      <div className="font-semibold ml-2">
                        {product.optionToBuy[infoToCart.spec]}
                      </div>
                    </div>
                    <div>
                      <ul className="space-x-2 flex">
                        {product.optionToBuy.map((opt) => (
                          <li
                            key={opt}
                            onClick={() =>
                              setInfoToCart((prev) => ({
                                ...prev,
                                spec: product.optionToBuy.indexOf(opt),
                              }))
                            }
                            className={
                              product.optionToBuy.indexOf(opt) ==
                              infoToCart.spec
                                ? "cursor-pointer border border-[#615f5f] p-2 rounded-lg  bg-[#2f3033]"
                                : "cursor-pointer border border-[#615f5f] p-2 rounded-lg  bg-[#4c4c53] text-[#a9a9a9]"
                            }
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div className="my-3 flex">
                  Màu:
                  <div className="font-semibold ml-2">
                    {product.color[infoToCart.color]}
                  </div>
                </div>
                <div>
                  <ul className="space-x-2 flex">
                    {product.color.map((opt) => (
                      <li
                        key={opt}
                        onClick={() =>
                          setInfoToCart((prev) => ({
                            ...prev,
                            color: product.color.indexOf(opt),
                          }))
                        }
                        className={
                          product.color.indexOf(opt) == infoToCart.color
                            ? "cursor-pointer border border-[#615f5f] p-2 rounded-lg  bg-[#2f3033]"
                            : "cursor-pointer border border-[#615f5f] p-2 rounded-lg  bg-[#4c4c53] text-[#a9a9a9]"
                        }
                      >
                        {" "}
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {state.cart.filter(
                (e: toCart) =>
                  e.id == infoToCart.id &&
                  e.spec == infoToCart.spec &&
                  e.color == infoToCart.color
              ).length > 0 ? (
                <Link href="/cart">
                  <div className="w-[100%] flex items-center justify-center py-4 rounded-2xl mt-3 bg-[#0071e3] cursor-pointer ">
                    <div className="text-lg font-semibold ">Xem giỏ hàng</div>
                  </div>
                </Link>
              ) : (
                <div
                  className="w-[100%] flex items-center justify-center py-4 rounded-2xl mt-3 bg-[#0071e3] cursor-pointer "
                  onClick={addToCard}
                >
                  <div className="text-lg font-semibold ">Mua ngay</div>
                </div>
              )}

              <div className="bg-[#2f3033] p-6 my-5 rounded-2xl">
                <h5 className="text-lg font-black">Khuyến mãi</h5>
                <h6 className="text-sm mb-2">
                  Giá và khuyến mãi dự kiến áp dụng đến 23:59 | 25/10
                </h6>
                <ol className="list-disc mx-3">
                  <li>
                    Thu cũ Đổi mới: Giảm đến 1.5 triệu (Tuỳ model máy cũ, không
                    áp dụng kèm giảm giá qua cổng thanh toán) Xem chi tiết
                  </li>
                  <li>
                    Giảm giá 35% iPad (Tuỳ model) khi mua kèm iPhone (Không kèm
                    khuyến mãi khác của iPad) Xem chi tiết
                  </li>
                  <li>
                    Giảm giá 35% iPad Pro M1 12.9&quot; 2021 (tuỳ phiên bản) khi
                    mua kèm iPhone (Không kèm khuyến mãi khác của iPad) Xem chi
                    tiết
                  </li>
                  <li>
                    Phụ kiện chính hãng Apple giảm 30% khi mua kèm iPhone Xem
                    chi tiết
                  </li>
                  <li>
                    {" "}
                    Giảm 50% gói Bảo hiểm rơi vỡ 6 tháng (click xem chi tiết)
                  </li>
                  <li>
                    Nhập mã SPPMWG giảm 10% tối đa 100.000đ khi thanh toán qua
                    Ví ShopeePay (click xem chi tiết)
                  </li>
                  <li>
                    {" "}
                    Nhập mã TGDD giảm 4% tối đa 200.000đ cho đơn hàng từ
                    500.000đ trở lên khi thanh toán qua Ví Moca trên ứng dụng
                    Grab (click xem chi tiết)
                  </li>
                </ol>
                <span className="text-sm mt-4">
                  (*) Giá hoặc khuyến mãi không áp dụng trả góp lãi suất đặc
                  biệt (0%, 0.5%, 1%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </Layout>
  );
}

export default Detail;
