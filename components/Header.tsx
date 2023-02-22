import logo from "../assets/logo";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore, actions } from "../store";
import { useRouter } from "next/router";
import { Products, receipt, toCart } from "../interface";
import Receipt from "./Receipt";
function Header() {
  const router = useRouter();
  const [userMenu, setUserMenu] = useState(false);
  const [history, setHistory] = useState(false);
  const [historyData, setHistoryData] = useState<Array<receipt>>();
  const [listProductId, setListProductId] = useState<Array<string>>([]);
  const [receiptProducts, setReceiptProducts] = useState<Array<Products>>();
  const [state, dispatch] = useStore();
  const [searchVisibility, setSearchVisibility] = useState(false);

  let logoV = Object.values(logo);

  // console.log(new Date().getTime());

  const searchClick = () => {
    setSearchVisibility((prev) => !prev);
  };

  const reloadPage = () => {
    dispatch(actions.setType(""));
    dispatch(actions.setReload(!state.reload));
    router.push("/search");
  };

  const optionOoO = () => {
    setUserMenu((prev) => !prev);
    if (history == true) {
      setHistory(false);
    }
  };

  return (
    <div className="bg-[#101010] ">
      <div className="relative">
        {searchVisibility && (
          <div className="absolute bg-[#030303] w-full h-full z-10 flex content-center justify-center m-auto left-0 right-0">
            <div className="w-1/2 m-auto flex">
              <div>
                <div onClick={reloadPage}>
                  <SearchIcon className="cursor-pointer" />
                </div>
              </div>
              <input
                type="text"
                className="bg-[#3e3e3f] text-white py-1 flex-1 rounded-2xl cursor-pointer mx-3 px-3 border-none outline-0"
                onChange={(e) => dispatch(actions.setSearch(e.target.value))}
              />
              <div onClick={searchClick}>
                <CloseIcon className="cursor-pointer" />
              </div>
            </div>
          </div>
        )}
        <div className="w-3/4 mx-auto flex justify-between relative">
          <div>
            <Link href="/">
              <div className="text-xl py-1 cursor-pointer">
                <img
                  onClick={() => {
                    dispatch(actions.setType("asdasdasd"));
                  }}
                  src={logoV[0].src}
                  alt=""
                  className="object-contain h-14"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex mb-0 pb-0 h-full">
              <Link href="/iphone">
                <li
                  onClick={() => {
                    dispatch(actions.setType("iphone"));
                  }}
                  className={
                    state.type == "iphone"
                      ? "hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                      : "hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                  }
                >
                  <div>iPhone</div>
                </li>
              </Link>
              <Link href="/mac">
                <li
                  onClick={() => {
                    dispatch(actions.setType("mac"));
                  }}
                  className={
                    state.type == "mac"
                      ? "hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                      : "hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                  }
                >
                  Mac
                </li>
              </Link>
              <Link href="/ipad">
                <li
                  onClick={() => {
                    dispatch(actions.setType("ipad"));
                  }}
                  className={
                    state.type == "ipad"
                      ? "hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                      : "hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                  }
                >
                  iPad
                </li>
              </Link>
            </ul>
          </div>
          <div className="space-x-3 flex items-center">
            <div
              className="cursor-pointer bg-[#2f3033] h-fit rounded-full p-[6px] hover:bg-[#5e5e60]"
              onClick={searchClick}
            >
              <SearchIcon />
            </div>
            <Link href={"/cart"}>
              <div className="cursor-pointer bg-[#2f3033] h-fit rounded-full p-[6px] hover:bg-[#5e5e60] relative">
                <LocalMallIcon />

                {state.cart.length > 0 ? (
                  <div className="absolute bottom-[-6px] right-[-6px] bg-red-500 w-[23px] h-[23px] rounded-full text-center bg-opacity-80">
                    <div className="absolute left-[7px] top-[0px]">
                      {state.cart.length}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Link>

            <div>
              {state.token != "" ? (
                <div className="flex space-x-2 relative">
                  <div className="flex" onClick={optionOoO}>
                    <div>
                      <AccountCircleIcon />
                    </div>
                    <div>
                      <ArrowDropDownIcon />
                    </div>
                  </div>
                  {userMenu && (
                    <div className="absolute top-[110%] right-0 bg-[#3e3e3f] rounded-2xl px-5 mt-3 z-10 w-max border border-[#777]">
                      <ul className="space-y-2 py-3 text-white">
                        {state.info.roles.includes("ROLE_ADMIN") ? (
                          <Link href={"/manage"}>
                            <li className="cursor-pointer">Quản lý</li>
                          </Link>
                        ) : (
                          <>
                            <li className="border-b border-[#999] pb-1">
                              <span className="">
                                Xin chào{" "}
                                <span className="text-lg font-bold">
                                  {state.info.sub}
                                </span>
                              </span>
                            </li>
                            <Link href={"/receiptPage"}>
                              <li
                                className="cursor-pointer"
                                // onClick={() => setHistory((prev) => !prev)}
                              >
                                Lịch sử mua hàng
                              </li>
                            </Link>
                          </>
                        )}
                        <li
                          className="cursor-pointer"
                          onClick={() => dispatch(actions.setToken(""))}
                        >
                          Đăng xuất
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* {history && historyData && receiptProducts && (
                    <Receipt
                      historyDataProp={historyData}
                      receiptProductsProp={receiptProducts}
                    />
                  )} */}
                </div>
              ) : (
                <Link href={"/login"}>
                  <div className="cursor-pointer">Login</div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-around">
        <ul className="flex mb-0 pb-0 h-full m-auto">
          <Link href="/iphone">
            <li
              onClick={() => {
                dispatch(actions.setType("iphone"));
              }}
              className={
                state.type == "iphone"
                  ? "hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                  : "hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
              }
            >
              <div>iPhone</div>
            </li>
          </Link>
          <Link href="/mac">
            <li
              onClick={() => {
                dispatch(actions.setType("mac"));
              }}
              className={
                state.type == "mac"
                  ? "hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                  : "hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
              }
            >
              Mac
            </li>
          </Link>
          <Link href="/ipad">
            <li
              onClick={() => {
                dispatch(actions.setType("ipad"));
              }}
              className={
                state.type == "ipad"
                  ? "hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
                  : "hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center"
              }
            >
              iPad
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
