import AppleIcon from "@mui/icons-material/Apple";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Product from "../components/Product";
import { info, Products } from "../interface";

function Display({ type, data }: info) {
  const [link, setLink] = useState<string>();
  const [productData, setProductData] = useState<Products[]>();

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setProductData(data.slice(0, 4));
    } else {
      setProductData(data);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    console.log(window.innerWidth);
    if (data.length != 0) {
      setLink(data[0].type);
    } else {
      setLink("");
    }
    document.querySelector("#previphone")?.addEventListener("click", () => {
      let iPhoneQuery = document.querySelector("#siphone") as HTMLElement;
      if (iPhoneQuery != undefined && iPhoneQuery != null) {
        iPhoneQuery.scrollLeft -= iPhoneQuery.offsetWidth;
      }
    });
    document.querySelector("#nextiphone")?.addEventListener("click", () => {
      let iPhoneQuery = document.querySelector("#siphone") as HTMLElement;
      if (iPhoneQuery != undefined && iPhoneQuery != null) {
        iPhoneQuery.scrollLeft += iPhoneQuery.offsetWidth;
      }
    });
    document.querySelector("#prevmac")?.addEventListener("click", () => {
      let macQuery = document.querySelector("#smac") as HTMLElement;
      if (macQuery != undefined && macQuery != null) {
        macQuery.scrollLeft -= macQuery.offsetWidth;
      }
    });
    document.querySelector("#nextmac")?.addEventListener("click", () => {
      let macQuery = document.querySelector("#smac") as HTMLElement;
      if (macQuery != undefined && macQuery != null) {
        macQuery.scrollLeft += macQuery.offsetWidth;
      }
    });
    document.querySelector("#previpad")?.addEventListener("click", () => {
      let ipadQuery = document.querySelector("#sipad") as HTMLElement;
      if (ipadQuery != undefined && ipadQuery != null) {
        ipadQuery.scrollLeft -= ipadQuery.offsetWidth;
      }
    });
    document.querySelector("#nextipad")?.addEventListener("click", () => {
      let ipadQuery = document.querySelector("#sipad") as HTMLElement;
      if (ipadQuery != undefined && ipadQuery != null) {
        ipadQuery.scrollLeft += ipadQuery.offsetWidth;
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
          className="flex m-auto mt-7 sm:overflow-x-scroll flex-wrap sm:flex-nowrap"
          id={
            type == "iPhone" ? "siphone" : type == "Macbook" ? "smac" : "sipad"
          }
        >
          {productData &&
            productData.map((product, i) => (
              <Product
                key={product.id}
                id={product.id}
                image={product.img[0]}
                name={product.name + " " + product.optionToBuy[0]}
                price={product.price[0]}
              />
            ))}
        </div>
      </div>
      <div className="absolute w-full top-[102%] sm:hidden justify-center flex">
        <Link href={"/" + type.toLowerCase()}>
          <div className="cursor-pointer text-[#1981dc] flex">
            {"Xem tất cả " + type + " "}
            <div>
              <ChevronRightIcon></ChevronRightIcon>
            </div>
          </div>
        </Link>
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 sm:flex justify-between hidden">
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
