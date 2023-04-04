import { useEffect, useState } from "react";
import { Products, TypeVar } from "../interface/index";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ProductGrid from "../components/ProductGrid";

function ProductList({
  product,
  typeList,
  nolink,
  typeAndModel,
}: {
  product: Products[];
  typeList: String[];
  nolink?: boolean;
  typeAndModel?: TypeVar;
}) {
  const [productType, setProductType] = useState("Tất cả");
  const [type, setType] = useState<String>("Tất cả");
  const [order, setOrder] = useState("Mới");
  const [orderScreen, setOrderScreen] = useState<boolean>(false);
  const [productData, setProductData] = useState<Products[]>();
  const [modelOfType, setModelOfType] = useState<String[]>();
  //sort product
  const sortProduct = (orderType: string) => {
    if (orderType == "Mới") {
      setProductData(
        (prev) =>
          prev &&
          prev.sort(function (a: Products, b: Products) {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
          })
      );
    } else if (orderType == "Giá cao đến thấp")
      setProductData(
        (prev) =>
          prev &&
          prev.sort(function (a: Products, b: Products) {
            if (
              Number(a.price[0].replaceAll(".", "")) >
              Number(b.price[0].replaceAll(".", ""))
            )
              return -1;
            if (
              Number(a.price[0].replaceAll(".", "")) <
              Number(b.price[0].replaceAll(".", ""))
            )
              return 1;
            return 0;
          })
      );
    else if (orderType == "Giá thấp đến cao")
      setProductData(
        (prev) =>
          prev &&
          prev.sort(function (a: Products, b: Products) {
            if (
              Number(a.price[0].replaceAll(".", "")) <
              Number(b.price[0].replaceAll(".", ""))
            )
              return -1;
            if (
              Number(a.price[0].replaceAll(".", "")) >
              Number(b.price[0].replaceAll(".", ""))
            )
              return 1;
            return 0;
          })
      );
  };
  // change product type
  useEffect(() => {
    if (
      !["iPhone", "iPad", "Mac", "Watch", "Accessory"].includes(productType)
    ) {
      setProductType("Tất cả");
      setModelOfType(typeList);
    }
    if (productType !== "Tất cả") {
      let filteredProduct = product.filter(
        (pro: Products) => pro.type == productType.toLowerCase()
      );
      setModelOfType(Array.from(new Set(filteredProduct.map((e) => e.model))));
      console.log(modelOfType);

      setProductData(
        filteredProduct.sort(function (a: Products, b: Products) {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        })
      );
      setOrder("Mới");
      setType("Tất cả");
    } else {
      setProductData(
        product.sort(function (a: Products, b: Products) {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        })
      );
      setOrder("Mới");
    }
    return () => {
      setOrderScreen(false);
    };
  }, [productType, product]);
  // change product model
  useEffect(() => {
    if (!typeList.includes(type)) {
      setType("Tất cả");
    }
    if (type !== "Tất cả") {
      let filteredProduct = product.filter(
        (pro: Products) => pro.model === type
      );
      setProductData(
        filteredProduct.sort(function (a: Products, b: Products) {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        })
      );
      setOrder("Mới");
    } else {
      setProductData(
        productType != "Tất cả"
          ? product
              .filter((e) => e.type == productType.toLowerCase())
              .sort(function (a: Products, b: Products) {
                if (a.date > b.date) return -1;
                if (a.date < b.date) return 1;
                return 0;
              })
          : product.sort(function (a: Products, b: Products) {
              if (a.date > b.date) return -1;
              if (a.date < b.date) return 1;
              return 0;
            })
      );
      setOrder("Mới");
    }
    return () => {
      setOrderScreen(false);
    };
  }, [type, product]);
  return (
    <div className="w-full h-full">
      {nolink && (
        <div
          className={`${
            nolink ? "w-full" : "w-4/5"
          } m-auto py-5 flex justify-start `}
        >
          <ul className="flex child:mr-6 child:mt-2 flex-wrap">
            <li
              onClick={() => setProductType("Tất cả")}
              className={
                productType == "Tất cả"
                  ? "cursor-pointer border-b border-b-white"
                  : "cursor-pointer hover:scale-110 transition-all"
              }
            >
              Tất cả
            </li>
            {["iPhone", "iPad", "Mac", "Watch", "Accessory"].map((typelist) => (
              <li
                className={
                  productType == typelist
                    ? "cursor-pointer border-b border-b-white"
                    : "cursor-pointer hover:scale-110 transition-all"
                }
                key={typelist}
                onClick={() => setProductType(typelist)}
              >
                {typelist}
              </li>
            ))}
          </ul>
        </div>
      )}
      {nolink && <div className="mt-3">Phân loại:</div>}
      <div
        className={`${
          nolink ? "w-full" : "w-4/5"
        } m-auto py-5 flex justify-start `}
      >
        <ul className="flex child:mr-6 child:mt-2 flex-wrap">
          <li
            onClick={() => setType("Tất cả")}
            className={
              type == "Tất cả"
                ? "cursor-pointer border-b border-b-white"
                : "cursor-pointer hover:scale-110 transition-all"
            }
          >
            Tất cả
          </li>
          {modelOfType &&
            modelOfType.map((typelist) => (
              <li
                className={
                  type == typelist
                    ? "cursor-pointer border-b border-b-white"
                    : "cursor-pointer hover:scale-110 transition-all"
                }
                key={typelist + ""}
                onClick={() => setType(typelist)}
              >
                {typelist}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div
          onClick={() => {
            setOrderScreen((prev) => !prev);
          }}
          className={`${
            nolink ? "w-full" : "w-4/5"
          } justify-end flex m-auto cursor-pointer relative select-none mb-3`}
        >
          <div>Xếp theo: {order}</div>
          <div>
            {orderScreen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
          {orderScreen && (
            <div className="absolute top-[110%] right-0 bg-white rounded-2xl text-black px-5 mt-3 z-30 ">
              <ul className="space-y-2 py-3">
                <li
                  onClick={() => {
                    sortProduct("Mới");
                    setOrder("Mới");
                  }}
                >
                  Mới
                </li>
                {/* <li onClick={() => setOrder("Bán chạy")}>Bán chạy</li> */}
                <li
                  onClick={() => {
                    sortProduct("Giá thấp đến cao");
                    setOrder("Giá thấp đến cao");
                  }}
                >
                  Giá thấp đến cao
                </li>
                <li
                  onClick={() => {
                    sortProduct("Giá cao đến thấp");
                    setOrder("Giá cao đến thấp");
                  }}
                >
                  Giá cao đến thấp
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className={`${
            nolink ? "w-full" : "w-4/5"
          } grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-auto gap-y-5`}
        >
          {productData &&
            productData.map((product) => (
              <ProductGrid
                link={nolink ? false : true}
                key={product.id}
                id={product.id}
                image={product.img[0]}
                name={product.name + " " + product.optionToBuy[0]}
                price={product.price[0]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
