import AppleIcon from "@mui/icons-material/Apple";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
// import fetch from "node-fetch";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import Product from "../components/Product";
import { info } from "../interface";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        paritialVisibilityGutter: 50,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30,
    },
};

function Display({ type, data }: info) {
    // useEffect(() => {
    //     let sliderContainer = document.getElementById("sliderContainer");
    //     let slider = document.getElementById("slider");
    //     let cards = document.getElementsByClassName("sliderCard");
    //     let elementsToShow = 4;

    //     // let prevClick = document.getElementById("prev");
    //     // let nextClick = document.getElementById("next");

    //     if (sliderContainer && slider && cards ) {
    //         let sliderContainerWidth = sliderContainer.clientWidth;
    //         let cardWidth = sliderContainerWidth / elementsToShow;
    //         let cardWidth2 = cardWidth - 12;
    //         slider.style.width = cards.length * cardWidth - 12 + "px";

    //         for (let i = 0; i < cards.length; i++) {
    //             const e = cards[i];
    //             e.style.width = cardWidth2 + "px";
    //         }

    //         // prevClick.addEventListener("click", () => {
    //         //     //console.log(+slider.style.marginLeft.slice(0, -2));
    //         //     slider.style.marginLeft =
    //         //         +slider.style.marginLeft.slice(0, -2) - cardWidth + "px";
    //         // });
    //         // nextClick.addEventListener("click", () => {
    //         //     //console.log(slider.style.marginLeft.slice(0, -2) + cardWidth);
    //         //     slider.style.marginLeft =
    //         //         +slider.style.marginLeft.slice(0, -2) + cardWidth + "px";
    //         // });
    //     }
    // }, []);

    const [link, setLink] = useState<string>();

    useEffect(() => {
        if (data.length != 0) {
            setLink(data[0].type);
        } else {
            setLink("");
        }
        let divi;
        if (window.matchMedia("(min-width: 640px)").matches) {
            if (window.matchMedia("(min-width: 768px)").matches) {
                if (window.matchMedia("(min-width: 1024px)").matches) {
                    divi = 4;
                } else {
                    divi = 3;
                }
            } else {
                divi = 3;
            }
        } else {
            divi = 3;
        }

        // let itemWidth =
        //     (document.getElementById("slider").offsetWidth - 12 * divi) / divi;

        // console.log(itemWidth);

        //document.getElementById("itemCard").style.width = itemWidth + "px";

        //let listCard = document.getElementsByClassName("sliderCard");
        // const listCard2 = document.querySelectorAll<HTMLElement>(".sliderCard");

        // for (var i = 0; i < listCard2.length; i++) {
        //     listCard2[i].style.width = itemWidth + "px";
        // }

        //listCard.forEach((e) => {});
        document.querySelector("#previphone")?.addEventListener("click", () => {
            document.getElementById("siphone").scrollLeft -=
                document.getElementById("siphone").offsetWidth; // / divi
        });
        document.querySelector("#nextiphone")?.addEventListener("click", () => {
            document.getElementById("siphone").scrollLeft +=
                document.getElementById("siphone").offsetWidth; // / divi
        });
        document.querySelector("#prevmac")?.addEventListener("click", () => {
            document.getElementById("smac").scrollLeft -=
                document.getElementById("smac").offsetWidth; // / divi
        });
        document.querySelector("#nextmac")?.addEventListener("click", () => {
            document.getElementById("smac").scrollLeft +=
                document.getElementById("smac").offsetWidth; // / divi
        });
        document.querySelector("#previpad")?.addEventListener("click", () => {
            document.getElementById("sipad").scrollLeft -=
                document.getElementById("sipad").offsetWidth; // / divi
        });
        document.querySelector("#nextipad")?.addEventListener("click", () => {
            document.getElementById("sipad").scrollLeft +=
                document.getElementById("sipad").offsetWidth; // / divi
        });
    }, []);

    return (
        <div className="relative">
            <div className="mt-7 w-4/5 mx-auto " id="sliderContainer">
                <div className="flex justify-center items-center">
                    <div>
                        <AppleIcon className="text-4xl" />
                    </div>
                    <Link href={"/" + link}>
                        <h2 className="text-4xl hover:cursor-pointer">
                            {type}
                        </h2>
                    </Link>
                </div>
                <div
                    className="flex m-auto mt-7 overflow-x-scroll" //w-4/5 max-w-4/5
                    // id="slider"
                    id={
                        type == "iPhone"
                            ? "siphone"
                            : type == "Macbook"
                            ? "smac"
                            : "sipad"
                    }
                >
                    {console.log(data)}
                    {data.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            image={product.img[0]}
                            name={product.name}
                            price={product.price[0]}
                            type={product.type}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between">
                <button
                    className="bg-[#68635c] rounded-full p-[6px] ml-24"
                    id={
                        type == "iPhone"
                            ? "previphone"
                            : type == "Macbook"
                            ? "prevmac"
                            : "previpad"
                    }
                    // onClick={console.log("prev onclick")}
                >
                    <ArrowBackIcon />
                </button>
                <button
                    className="bg-[#68635c] rounded-full p-[6px] mr-24"
                    // id="next"
                    id={
                        type == "iPhone"
                            ? "nextiphone"
                            : type == "Macbook"
                            ? "nextmac"
                            : "nextipad"
                    }
                    // onClick={console.log("next onclick")}
                >
                    <ArrowForwardIcon />
                </button>
            </div>
        </div>
    );
}

export default Display;
