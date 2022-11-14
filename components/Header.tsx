import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Link from "next/link";
function Header() {
    return (
        <div className="bg-[#101010] ">
            <div className="w-3/4 mx-auto flex justify-between">
                <div>
                    <Link href="/">
                        <h1 className="text-xl py-4 cursor-pointer">BotZONE</h1>
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
                        <Link href="/watch">
                            <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                                <div>Watch</div>
                            </li>
                        </Link>
                        {/* <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                            <a href="/">Âm thanh</a>
                        </li>
                        <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                            <a href="/">Phụ kiện</a>
                        </li> */}
                        {/* <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                            <a href="/">TekZone</a>
                        </li> */}
                        <Link href="/topcare">
                            <li className="hover:bg-[#2d2d2d] py-4 px-5 cursor-pointer">
                                <div>TopCare</div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="space-x-3 flex items-center">
                    <div className="cursor-pointer bg-[#2f3033] h-fit rounded-full p-[6px] hover:bg-[#5e5e60]">
                        <SearchIcon />
                    </div>
                    <div className="cursor-pointer bg-[#2f3033] h-fit rounded-full p-[6px] hover:bg-[#5e5e60]">
                        <LocalMallIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
