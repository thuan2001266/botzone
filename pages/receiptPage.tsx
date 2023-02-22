import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from "next/link";
import { useStore } from "../store/index";
import { useEffect, useState } from "react";
import { Products, receipt, toCart } from "../interface/index";
import Header from "../components/Header";

function ReceiptPage() {
  const [state, dispatch] = useStore();
  const [historyData, setHistoryData] = useState<Array<receipt>>();
  const [listProductId, setListProductId] = useState<Array<string>>([]);
  const [receiptProducts, setReceiptProducts] = useState<Array<Products>>();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(
        "https://botzone.herokuapp.com/api/product/cart",
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            listCart: listProductId.join(","),
          }),
        }
      );
      const data = await response.json();
      setReceiptProducts(data.data);
    };
    if (state.token != "" && listProductId.length > 0) {
      fetchCart();
    }
  }, [listProductId]);

  useEffect(() => {
    if (state.info != "") {
      const fetchResult = async () => {
        const result = await fetch(
          "https://botzone.herokuapp.com/" + `api/receipt/` + state.info.sub,
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
        setHistoryData(
          data.data.sort((a: receipt, b: receipt) => {
            if (a.id > b.id) return -1;
            return 1;
          })
        );
        const listofID = data.data.reduce(
          (result1: Array<string>, curr1: any) => {
            result1 = [
              ...result1,
              ...curr1.addresses.reduce(
                (result: Array<string>, curr: toCart) => {
                  result.push(curr.id);
                  return result;
                },
                []
              ),
            ];
            return result1;
          },
          []
        );
        setListProductId(Array.from(new Set(listofID)));
      };

      fetchResult();
    }
  }, []);

  return (
    <>
      <Header></Header>
      {state.token != "" ? (
        <div className="h-screen bg-[#f0f0f0]">
          <div className="w-full h-fit m-auto bg-[#f0f0f0] text-[#897560] pb-20">
            <div className="w-4/5 md:w-3/5 lg:w-2/3 m-auto flex justify-between py-2">
              <Link href={"/"}>
                <div className="ml-2 flex cursor-pointer">
                  <div>
                    <ArrowLeftIcon />
                  </div>
                  Tiếp tục mua sắm
                </div>
              </Link>
              <div className="mr-2">Lịch sử mua hàng:</div>
            </div>
            <div className="w-4/5 md:w-3/5 lg:w-2/3 bg-[#ffffff] m-auto rounded-2xl shadow-xl ">
              <div>
                {historyData &&
                  historyData.map((e, i) => (
                    <>
                      <div key={e.id + "e" + e.addresses} className="px-3 pt-2">
                        <div>
                          <span className="font-bold mr-1 text-black">
                            Đơn hàng:
                          </span>
                          <span className="text-black">{e.id}</span>
                        </div>
                        <div>
                          <span className="font-bold mr-1 text-black">
                            Lúc:
                          </span>
                          <span className="text-black">{e.mili}</span>
                        </div>
                        <div>
                          <div className="font-bold text-black">Sản phẩm:</div>
                          {e.addresses.map((p: toCart) => {
                            const itemData = receiptProducts?.find((obj) => {
                              return obj.id == p.id;
                            });
                            if (itemData) {
                              return (
                                <div
                                  key={
                                    p.id +
                                    "" +
                                    p.color +
                                    "" +
                                    p.quant +
                                    "" +
                                    p.spec
                                  }
                                  className="flex w-full pt-4 text-black flex-col sm:flex-row"
                                >
                                  {/* image + delete button */}
                                  <div className="flex-col justify-center flex">
                                    <Link href={`/detail/` + p.id}>
                                      <div className="w-[160px] sm:w-[90px] object-contain flex m-auto pb-2 sm:pb-0 cursor-pointer">
                                        <img
                                          src={itemData.img[p.color]}
                                          alt=""
                                          className="m-auto w-full"
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="flex flex-col lg:flex-row justify-between w-full">
                                    {/* product name + spec */}
                                    <div className="flex-1 md:px-7 justify-center flex flex-col ">
                                      <div className="flex-col sm:flex-row">
                                        <span>Tên sản phẩm: </span>
                                        <span className="font-medium">
                                          {itemData.name}
                                        </span>
                                      </div>
                                      <div className="flex-col sm:flex-row">
                                        <span>Thông tin: </span>
                                        <span className="font-medium">
                                          {itemData.optionToBuy[p.spec] +
                                            " | " +
                                            itemData.color[p.color]}
                                        </span>
                                      </div>
                                    </div>
                                    {/* price + quantity */}
                                    <div className="md:pl-7 pt-2 md:pt-0">
                                      <div className="flex flex-col sm:flex-row">
                                        <span className="pr-2">
                                          Giá sản phẩm:{" "}
                                        </span>
                                        <div className="font-medium ">
                                          {itemData.price[p.spec]}₫
                                        </div>
                                      </div>
                                      <div className="flex my-3 flex-col sm:flex-row">
                                        <div className="mr-2">Số lượng:</div>
                                        <div className="flex space-x-2 ">
                                          <div className="w-3 text-center font-medium">
                                            {p.quant}
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
                        <div
                          className={
                            i == historyData.length - 1
                              ? " mt-0 md:mt-3 text-lg font-medium justify-between flex text-black pb-7 flex-col sm:flex-row"
                              : " mt-0 md:mt-3 text-lg font-medium justify-between flex text-black pb-7 flex-col sm:flex-row border-b border-[#6a6363]"
                          }
                        >
                          <div>
                            Số sản phẩm:{" "}
                            {e.addresses.reduce(
                              (productNum: number, curr: toCart) => {
                                return productNum + curr.quant;
                              },
                              0
                            )}
                          </div>
                          <div className="flex">
                            Tổng tiền:{" "}
                            <div className="text-red-600 ml-2">
                              {e.addresses
                                .reduce((s: number, e: toCart) => {
                                  return (
                                    s +
                                    Number(e.quant) *
                                      Number(
                                        receiptProducts
                                          ?.find(
                                            (ein: Products) => ein.id == e.id
                                          )
                                          ?.price[e.spec].replaceAll(".", "")
                                      )
                                  );
                                }, 0)
                                .toLocaleString("en-US")
                                .replaceAll(",", ".")}
                              ₫
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid h-screen place-items-center text-center">
          <div className="mb-24">
            <h3 className="text-2xl">
              Bạn cần đăng nhập để xem danh sách hóa đơn!
            </h3>
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

export default ReceiptPage;
