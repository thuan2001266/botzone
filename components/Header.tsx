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

function Header() {
  const router = useRouter();
  const [userMenu, setUserMenu] = useState(false);
  const [history, setHistory] = useState(false);
  const [state, dispatch] = useStore();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  let logoV = Object.values(logo);

  useEffect(() => {
    setIsMounted(true);
  }, [searchVisibility]);

  useEffect(() => {
    setSearchVisibility(state.pageLayer);
  }, [state.pageLayer]);

  const searchClick = () => {
    setSearchVisibility((prev) => !prev);
    dispatch(actions.setSearch(""));
    dispatch(actions.setPageLayer(!state.pageLayer));
    setIsMounted(false);
  };

  const reloadPage = () => {
    dispatch(actions.setType(""));
    dispatch(actions.setReload(!state.reload));
    dispatch(actions.setPageLayer(false));
    router.push("/search");
  };

  const optionOoO = () => {
    setUserMenu((prev) => !prev);
    if (history == true) {
      setHistory(false);
    }
  };

  useEffect(() => {
    const pokeBackend = async () => {
      console.log("poke backend");
      const result = await fetch(
        "https://botzone.onrender.com/" + `api/product`
      );
      const data = await result.json();
    };
    const myInterval = setInterval(pokeBackend, 30 * 60 * 1000);
    return () => clearInterval(myInterval);
  }, []);

  return (
    <div className="bg-[#101010] ">
      <div className="relative">
        {/* search bar  */}
        {searchVisibility && (
          <div className="absolute bg-[#030303] w-full h-full z-50 flex content-center justify-center m-auto left-0 right-0">
            <div className="w-[80%] md:w-[60%] m-auto flex">
              <div>
                <div
                  onClick={reloadPage}
                  className="hover:scale-110 transition-all"
                >
                  <SearchIcon className="cursor-pointer" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="placeholder:text-[#999]  transition-width duration-500 ease-in-out bg-black text-white py-1 flex-1 rounded-xl cursor-text mx-3 px-3 border-none outline-0"
                onChange={(e) => dispatch(actions.setSearch(e.target.value))}
              />
              <div
                onClick={searchClick}
                className="hover:scale-110 transition-all"
              >
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
                      ? `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-150 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                      : `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-150 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                  }
                >
                  <div className="group-hover:scale-110 transition-all">
                    iPhone
                  </div>
                </li>
              </Link>
              <Link href="/mac">
                <li
                  onClick={() => {
                    dispatch(actions.setType("mac"));
                  }}
                  className={
                    state.type == "mac"
                      ? `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-300 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                      : `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-300 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                  }
                >
                  <div className="group-hover:scale-110 transition-all">
                    Mac
                  </div>
                </li>
              </Link>
              <Link href="/ipad">
                <li
                  onClick={() => {
                    dispatch(actions.setType("ipad"));
                  }}
                  className={
                    state.type == "ipad"
                      ? `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-500 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                      : `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-500 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                  }
                >
                  <div className="group-hover:scale-110 transition-all">
                    iPad
                  </div>
                </li>
              </Link>
              <Link href="/watch">
                <li
                  onClick={() => {
                    dispatch(actions.setType("watch"));
                  }}
                  className={
                    state.type == "watch"
                      ? `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                      : `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                  }
                >
                  <div className="group-hover:scale-110 transition-all">
                    Watch
                  </div>
                </li>
              </Link>
              <Link href="/accessory">
                <li
                  onClick={() => {
                    dispatch(actions.setType("accessory"));
                  }}
                  className={
                    state.type == "accessory"
                      ? `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                      : `${
                          isMounted
                            ? "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
                            : "opacity-0 translate-y-4"
                        }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                  }
                >
                  <div className="group-hover:scale-110 transition-all">
                    Accessory
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          <div className="space-x-3 flex items-center">
            <div
              className="cursor-pointer bg-[#2f3033] h-fit rounded-full p-[6px] hover:bg-[#5e5e60] hover:scale-110 transition-all"
              onClick={searchClick}
            >
              <SearchIcon />
            </div>
            <Link href={"/cart"}>
              <div
                onClick={() => dispatch(actions.setType(""))}
                className="cursor-pointer bg-[#2f3033] h-fit rounded-full p-[6px] hover:bg-[#5e5e60] relative group "
              >
                <div className="group-hover:scale-110 transition-all">
                  <LocalMallIcon />
                </div>

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
                            <li
                              className="cursor-pointer"
                              onClick={() => dispatch(actions.setType(""))}
                            >
                              Quản lý
                            </li>
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
                          onClick={() => {
                            dispatch(actions.setToken(""));
                          }}
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
                  <div className="cursor-pointer hover:scale-110 transition-all">
                    Login
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {searchVisibility ? (
        ""
      ) : (
        <div className="md:hidden flex justify-around">
          <ul className="flex mb-0 pb-0 h-full m-auto">
            <Link href="/iphone">
              <li
                onClick={() => {
                  dispatch(actions.setType("iphone"));
                }}
                className={
                  state.type == "iphone"
                    ? `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-150 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                    : `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-150 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                }
              >
                <div className="group-hover:scale-110 transition-all">
                  iPhone
                </div>
              </li>
            </Link>
            <Link href="/mac">
              <li
                onClick={() => {
                  dispatch(actions.setType("mac"));
                }}
                className={
                  state.type == "mac"
                    ? `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-300 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                    : `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-300 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                }
              >
                <div className="group-hover:scale-110 transition-all">Mac</div>
              </li>
            </Link>
            <Link href="/ipad">
              <li
                onClick={() => {
                  dispatch(actions.setType("ipad"));
                }}
                className={
                  state.type == "ipad"
                    ? `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-500 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                    : `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-500 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                }
              >
                <div className="group-hover:scale-110 transition-all">iPad</div>
              </li>
            </Link>
            <Link href="/watch">
              <li
                onClick={() => {
                  dispatch(actions.setType("watch"));
                }}
                className={
                  state.type == "watch"
                    ? `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                    : `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                }
              >
                <div className="group-hover:scale-110 transition-all">
                  Watch
                </div>
              </li>
            </Link>
            <Link href="/accessory">
              <li
                onClick={() => {
                  dispatch(actions.setType("accessory"));
                }}
                className={
                  state.type == "accessory"
                    ? `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                    : `${
                        isMounted
                          ? "opacity-100 translate-y-0 transition-all duration-1000 ease-out"
                          : "opacity-0 translate-y-4"
                      }group hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer h-full grid place-items-center`
                }
              >
                <div className="group-hover:scale-110 transition-all">
                  Accessory
                </div>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
