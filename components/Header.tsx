import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState } from "react";
import { useStore, actions } from "../store";
import { useRouter } from "next/router";
function Header() {
    const router = useRouter();
    const [state, dispatch] = useStore();
    const [searchVisibility, setSearchVisibility] = useState(false);
    const searchClick = () => {
        setSearchVisibility((prev) => !prev);
    };

    const reloadPage = () => {
        dispatch(actions.setReload(!state.reload));
        router.push("/search");
    };
    return (
        <div className="bg-[#101010] ">
            <div className="relative">
                {searchVisibility && (
                    <div className="absolute bg-[#030303] w-full h-full z-10 flex content-center justify-center m-auto">
                        <div className="w-1/2 m-auto flex">
                            <div>
                                {/* href={"/search"} */}
                                <div onClick={reloadPage}>
                                    {/* onClick={searchText} id="clickSearch" */}
                                    <SearchIcon className="cursor-pointer" />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="bg-[#3e3e3f] text-white py-1 flex-1 rounded-2xl cursor-pointer mx-3 text-black px-3 border-none outline-0"
                                onChange={
                                    (e) =>
                                        dispatch(
                                            actions.setSearch(e.target.value)
                                        )
                                    // setSearchContent(e.target.value)
                                }
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
                            <h1 className="text-xl py-4 cursor-pointer">
                                BotZONE
                            </h1>
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="flex mb-0 pb-0 h-full">
                            <Link href="/iphone">
                                <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                                    <div>iPhone</div>
                                </li>
                            </Link>
                            <Link href="/mac">
                                <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                                    <div>Mac</div>
                                </li>
                            </Link>
                            <Link href="/ipad">
                                <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                                    <div>iPad</div>
                                </li>
                            </Link>
                            {/* <Link href="/watch">
                            <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                                <div>Watch</div>
                            </li>
                        </Link> */}
                            {/* <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                            <a href="/">Âm thanh</a>
                        </li>
                        <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                            <a href="/">Phụ kiện</a>
                        </li> */}
                            {/* <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                            <a href="/">TekZone</a>
                        </li> */}
                            {/* <Link href="/topcare">
                            <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                                <div>TopCare</div>
                            </li>
                        </Link> */}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
