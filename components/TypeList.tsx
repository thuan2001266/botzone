import Link from "next/link";
import png from "../assets/pngs";
function TypeList() {
    let pngs = Object.values(png);
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center mt-10 w-4/5 m-auto">
            <Link href={"/iphone"}>
                <div className="flex flex-col items-center pt-7 pb-4 pl-4 pr-4 bg-[#323232] rounded-lg m-2 ">
                    <div className="w-[170px]">
                        <img
                            src={pngs[0].src}
                            alt=""
                            className="object-contain h-[125px] max-w-[170px] object-bottom m-auto"
                        />
                    </div>
                    <div>iPhone</div>
                </div>
            </Link>
            <Link href={"/mac"}>
                <div className="flex flex-col items-center pt-7 pb-4 pl-4 pr-4 bg-[#323232] rounded-lg m-2 ">
                    <div className="w-[170px]">
                        <img
                            src={pngs[1].src}
                            alt=""
                            className="object-contain h-[125px] max-w-[170px] object-bottom align-middle m-auto"
                        />
                    </div>
                    <div>Mac</div>
                </div>
            </Link>
            <Link href={"/ipad"}>
                <div className="flex flex-col items-center pt-7 pb-4 pl-4 pr-4 bg-[#323232] rounded-lg m-2 ">
                    <div className="w-[170px]">
                        <img
                            src={pngs[2].src}
                            alt=""
                            className="object-contain h-[125px] max-w-[170px] object-bottom m-auto"
                        />
                    </div>
                    <div>iPad</div>
                </div>
            </Link>
            <Link href={"/watch"}>
                <div className="flex flex-col items-center pt-7 pb-4 pl-4 pr-4 bg-[#323232] rounded-lg m-2 ">
                    <div className="w-[170px]">
                        <img
                            src={pngs[3].src}
                            alt=""
                            className="object-contain h-[125px] max-w-[170px] object-bottom m-auto"
                        />
                    </div>
                    <div>Watch</div>
                </div>
            </Link>
        </div>
    );
}

export default TypeList;
