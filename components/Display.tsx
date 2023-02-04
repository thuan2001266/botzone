import AppleIcon from "@mui/icons-material/Apple";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
// import fetch from "node-fetch";
import { useEffect, useState, useRef } from "react";
import Product from "../components/Product";
import { info } from "../interface";

function Display({ type, data }: info) {
  const [link, setLink] = useState<string>();
  useEffect(() => {
    console.log(window.innerWidth);
    if (data.length != 0) {
      setLink(data[0].type);
    } else {
      setLink("");
    }
    // let divi;
    // if (window.matchMedia("(min-width: 640px)").matches) {
    //   if (window.matchMedia("(min-width: 768px)").matches) {
    //     if (window.matchMedia("(min-width: 1024px)").matches) {
    //       divi = 4;
    //     } else {
    //       divi = 3;
    //     }
    //   } else {
    //     divi = 2;
    //   }
    // } else {
    //   divi = 1;
    // }
    document.querySelector("#previphone")?.addEventListener("click", () => {
      if (document.querySelector("#siphone") != undefined) {
        document.querySelector("#siphone").scrollLeft -=
          document.querySelector("#siphone").offsetWidth;
      }
    });
    document.querySelector("#nextiphone")?.addEventListener("click", () => {
      if (document.querySelector("#siphone") != undefined) {
        document.querySelector("#siphone").scrollLeft +=
          document.querySelector("#siphone").offsetWidth;
      }
    });
    document.querySelector("#prevmac")?.addEventListener("click", () => {
      if (document.querySelector("#smac") != undefined) {
        document.querySelector("#smac").scrollLeft -=
          document.querySelector("#smac")?.offsetWidth;
      }
    });
    document.querySelector("#nextmac")?.addEventListener("click", () => {
      if (document.querySelector("#smac") != undefined) {
        document.querySelector("#smac").scrollLeft +=
          document.querySelector("#smac").offsetWidth;
      }
    });
    document.querySelector("#previpad")?.addEventListener("click", () => {
      if (document.querySelector("#sipad") != undefined) {
        document.querySelector("#sipad").scrollLeft -=
          document.querySelector("#sipad").offsetWidth;
      }
    });
    document.querySelector("#nextipad")?.addEventListener("click", () => {
      if (document.querySelector("#smac") != undefined) {
        document.querySelector("#sipad").scrollLeft +=
          document.querySelector("#sipad").offsetWidth;
      }
    });
  }, []);

  return (
    <div className="relative mb-20">
      <div className="mt-7 w-4/5 mx-auto " id="sliderContainer">
        <div className="flex justify-center items-center">
          <div>
            <AppleIcon className="text-4xl" />
          </div>
          <Link href={"/" + link}>
            <h2 className="text-4xl hover:cursor-pointer">{type}</h2>
          </Link>
        </div>
        <div
          className="flex m-auto mt-7 overflow-x-scroll"
          id={
            type == "iPhone" ? "siphone" : type == "Macbook" ? "smac" : "sipad"
          }
        >
          {data.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              image={product.img[0]}
              name={product.name + " " + product.option[0]}
              price={product.price[0]}
              type={product.type}
              option={product.option[0]}
            />
          ))}
        </div>
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between">
        <button
          className="bg-[#68635c] rounded-full p-[6px] ml-2 sm:ml-3 md:ml-12 lg:ml-16"
          id={
            type == "iPhone"
              ? "previphone"
              : type == "Macbook"
              ? "prevmac"
              : "previpad"
          }
        >
          <ArrowBackIcon />
        </button>
        <button
          className="bg-[#68635c] rounded-full p-[6px] mr-2 sm:mr-3 md:mr-12 lg:mr-16"
          id={
            type == "iPhone"
              ? "nextiphone"
              : type == "Macbook"
              ? "nextmac"
              : "nextipad"
          }
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
}

export default Display;
