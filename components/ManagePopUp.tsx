import { Products } from "../interface/index";
import { useStore, actions } from "../store";
import { useEffect, useRef, useState } from "react";
import { trim } from "jquery";
function ManagePopUp({
  popType,
  product,
}: {
  popType: String;
  product: Products;
}) {
  const [state, dispatch] = useStore();
  const [message, setMessage] = useState({
    iNameMessage: "",
    iPriceMessage: "",
    iColorMessage: "",
    iImageMessage: "",
    iOptionMessage: "",
    iModelMessage: "",
  });
  const [popupData, setPopupData] = useState({
    iId: "",
    iName: "",
    iPrice: "",
    iColor: "",
    iImage: "",
    iOption: "",
    iType: "",
    selectedOption: "",
    iModel: "",
  });
  const refName = useRef(null);
  const refType = useRef(null);
  const refModel = useRef(null);
  const refOption = useRef(null);
  const refPrice = useRef(null);
  const refColor = useRef(null);
  const refImage = useRef(null);

  const confirmClicked = () => {
    if (state.crud.delete) {
      dispatch(actions.setPageLayer(!state.pageLayer));
      dispatch(
        actions.setCRUDAction({
          ...state.crud,
          create: false,
          delete: true,
          update: false,
          productId: product.id,
          execute: true,
        })
      );
    } else {
      let executeAble = true;
      let iNameMessage = "",
        iPriceMessage = "",
        iColorMessage = "",
        iImageMessage = "",
        iOptionMessage = "",
        iModelMessage = "";
      if (popupData.iName == "") {
        iNameMessage = "Không được để trống tên sản phẩm";
        executeAble = false;
      }
      if (popupData.iPrice.split(",")[0] == "") {
        iPriceMessage = "Không được để trống giá";
        executeAble = false;
      }
      if (popupData.iColor.split(",")[0] == "") {
        iColorMessage = "Không được để trống màu";
        executeAble = false;
      }
      if (popupData.iImage.split(",")[0] == "") {
        iImageMessage = "Không được để trống liên kết hình ảnh";
        executeAble = false;
      }
      if (
        popupData.iOption.split(",")[0] == "" &&
        popupData.selectedOption != "accessory"
      ) {
        iOptionMessage = "Không được để trống tùy chọn";
        executeAble = false;
      }
      if (popupData.iModel == "") {
        iModelMessage = "Không được để trống loại sản phẩm";
        executeAble = false;
      }
      if (
        popupData.iColor.split(",").length !=
          popupData.iImage.split(",").length &&
        popupData.iColor != "" &&
        popupData.iImage != ""
      ) {
        iColorMessage = "Thông tin hình ảnh và màu sắc không đồng đều";
        iImageMessage = "Thông tin hình ảnh và màu sắc không đồng đều";
        executeAble = false;
      }
      if (
        popupData.iOption.split(",").length !=
          popupData.iPrice.split(",").length &&
        popupData.iOption != "" &&
        popupData.iPrice != ""
      ) {
        iOptionMessage = "Thông tin cấu hình và giá không đồng đều";
        iPriceMessage = "Thông tin cấu hình và giá không đồng đều";
        executeAble = false;
      }

      if (executeAble) {
        dispatch(actions.setPageLayer(!state.pageLayer));
        // console.log({
        //   id: product.id,
        //   name: popupData.iName,
        //   price: popupData.iPrice.split(",").map((e) => e.trim()),
        //   color: popupData.iColor.split(",").map((e) => e.trim()),
        //   img: popupData.iImage.split(",").map((e) => e.trim()),
        //   optionToBuy: popupData.iOption.split(",").map((e) => e.trim()),
        //   discount: "",
        //   date: new Date().getTime(),
        //   type: popupData.iType,
        //   model: popupData.iModel,
        // });

        dispatch(
          actions.setCRUDAction({
            create: state.crud.create,
            delete: false,
            update: state.crud.update,
            productId: product.id,
            productInfo: {
              id: product.id,
              name: popupData.iName,
              price: popupData.iPrice.split(",").map((e) => e.trim()),
              color: popupData.iColor.split(",").map((e) => e.trim()),
              img: popupData.iImage.split(",").map((e) => e.trim()),
              optionToBuy: popupData.iOption.split(",").map((e) => e.trim()),
              discount: "",
              date: new Date().getTime(),
              type: popupData.selectedOption,
              model: popupData.iModel,
            },
            execute: true,
          })
        );
      } else {
        setMessage({
          iNameMessage: iNameMessage,
          iPriceMessage: iPriceMessage,
          iColorMessage: iColorMessage,
          iImageMessage: iImageMessage,
          iOptionMessage: iOptionMessage,
          iModelMessage: iModelMessage,
        });
      }
    }
  };

  // update data when other product is choosed, don't init data in state cuz it won't update by the time popup appear
  useEffect(() => {
    let productTypeUpper = "";
    if (product) {
      switch (product.type) {
        case "iphone":
          productTypeUpper = "iPhone";
          break;
        case "ipad":
          productTypeUpper = "iPad";
          break;
        case "mac":
          productTypeUpper = "Mac";
          break;
        case "watch":
          productTypeUpper = "Watch";
          break;
        case "accessory":
          productTypeUpper = "Accessory";
          break;
      }
      if (popType == "update") {
        setPopupData({
          iId: product.id,
          iName: product.name,
          iPrice: product.price.join(", "),
          iColor: product.color.join(", "),
          iImage: product.img.join(", "),
          iOption: product.optionToBuy.join(", "),
          iType: productTypeUpper,
          selectedOption: product.type,
          iModel: product.model,
        });
      } else {
        setPopupData({
          iId: "",
          iName: "",
          iPrice: "",
          iColor: "",
          iImage: "",
          iOption: "",
          iType: "",
          selectedOption: "iphone",
          iModel: "",
        });
      }
    }
  }, [product]);

  return (
    <div
      className={`${
        popType != "delete" ? "h-[88%]" : ""
      } overflow-hidden z-50 fixed m-auto  left-0 right-0 top-10 w-[555px] bg-white rounded-lg text-black py-3 px-8`}
    >
      <div className={`w-full h-full p-2`}>
        {popType === "delete" ? (
          <div className="text-center pb-10">
            Xóa<br></br>
            <span className="font-medium">{product.name}</span>
          </div>
        ) : (
          <form
            action=""
            className={`w-full max-h-[90%] overflow-hidden ${
              popType != "delete" ? "overflow-y-auto" : ""
            }`}
          >
            <div className="w-full text-center text-lg font-semibold">
              {popType == "create"
                ? "Thêm sản phẩm"
                : "Sửa sản phẩm " + popupData.iType}
            </div>
            <div>
              <div className="font-medium flex justify-between">
                <span>Tên</span>{" "}
                {message.iNameMessage != "" || popupData.iName == "" ? (
                  <span className="text-[#ff3333] text-sm">
                    {message.iNameMessage}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <input
                ref={refName}
                value={popupData.iName}
                onChange={(e) => {
                  setPopupData({ ...popupData, iName: e.target.value });
                }}
                type="text"
                className={`text-black px-2 pb-1 rounded-sm mb-2 w-full ${
                  message.iNameMessage != "" || popupData.iName == ""
                    ? "border-[#ff3333]"
                    : "border-black"
                } focus:outline-none border-b`}
              />
            </div>
            {!state.crud.update && (
              <div className="flex space-x-2 mt-2">
                <div className="w-[16%] font-medium">Phân loại</div>
                <select
                  defaultValue={"iphone"}
                  ref={refType}
                  className="pl-1 border-black focus:outline-none border-b rounded-sm"
                  value={popupData.selectedOption}
                  onChange={(e) =>
                    setPopupData({
                      ...popupData,
                      selectedOption: e.target.value,
                    })
                  }
                >
                  <option value="iphone">iPhone</option>
                  <option value="ipad">iPad</option>
                  <option value="mac">Mac</option>
                  <option value="watch">Watch</option>
                  <option value="accessory">Accessory</option>
                </select>
              </div>
            )}

            <div className="mt-2">
              <div className="font-medium flex justify-between">
                <span>Phiên bản</span>
                {message.iModelMessage != "" ? (
                  <span className="text-[#ff3333] text-sm">
                    {message.iModelMessage}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <input
                ref={refModel}
                value={popupData.iModel}
                onChange={(e) => {
                  if (e.target.value != "") {
                    setMessage({ ...message, iModelMessage: "" });
                  }
                  setPopupData({ ...popupData, iModel: e.target.value });
                }}
                type="text"
                className={`text-black px-2 py-1 rounded-sm mb-2 w-full ${
                  message.iModelMessage != "" || popupData.iModel == ""
                    ? "border-[#ff3333]"
                    : "border-black"
                } focus:outline-none border-b`}
              />
            </div>
            {popupData.selectedOption != "accessory" && (
              <div>
                <div className="font-medium  flex justify-between">
                  <span>Tùy chọn</span>
                  {message.iOptionMessage != "" ? (
                    <span className="text-[#ff3333] text-sm">
                      {message.iOptionMessage}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  ref={refOption}
                  value={popupData.iOption}
                  onChange={(e) => {
                    if (e.target.value != "") {
                      setMessage({
                        ...message,
                        iOptionMessage: "",
                        iPriceMessage: "",
                      });
                    }
                    setPopupData({ ...popupData, iOption: e.target.value });
                  }}
                  type="text"
                  className={`text-black px-2 py-1 rounded-sm mb-2 w-full ${
                    message.iOptionMessage != "" || popupData.iOption == ""
                      ? "border-[#ff3333]"
                      : "border-black"
                  } focus:outline-none border-b`}
                />
              </div>
            )}
            <div>
              <div className="font-medium  flex justify-between">
                <span>Giá</span>
                {message.iPriceMessage != "" ? (
                  <span className="text-[#ff3333] text-sm">
                    {message.iPriceMessage}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <input
                ref={refPrice}
                value={popupData.iPrice}
                onChange={(e) => {
                  if (e.target.value != "") {
                    setMessage({
                      ...message,
                      iOptionMessage: "",
                      iPriceMessage: "",
                    });
                  }
                  setPopupData({ ...popupData, iPrice: e.target.value });
                }}
                type="text"
                className={`text-black px-2 py-1 rounded-sm mb-2 w-full ${
                  message.iPriceMessage != "" || popupData.iPrice == ""
                    ? "border-[#ff3333]"
                    : "border-black"
                } focus:outline-none border-b`}
              />
            </div>
            <div>
              <div className="font-medium flex justify-between">
                <span>Màu</span>
                {message.iColorMessage != "" ? (
                  <span className="text-[#ff3333] text-sm">
                    {message.iColorMessage}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <input
                ref={refColor}
                value={popupData.iColor}
                onChange={(e) => {
                  if (e.target.value != "") {
                    setMessage({
                      ...message,
                      iColorMessage: "",
                      iImageMessage: "",
                    });
                  }
                  setPopupData({ ...popupData, iColor: e.target.value });
                }}
                type="text"
                className={`text-black px-2 py-1 rounded-sm mb-2 w-full ${
                  message.iColorMessage != "" || popupData.iColor == ""
                    ? "border-[#ff3333]"
                    : "border-black"
                } focus:outline-none border-b`}
              />
            </div>
            <div>
              <div className="font-medium flex justify-between">
                <span>Liên kết hình ảnh</span>{" "}
                {message.iImageMessage != "" ? (
                  <span className="text-[#ff3333] text-sm">
                    {message.iImageMessage}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <textarea
                ref={refImage}
                value={popupData.iImage}
                onChange={(e) => {
                  if (e.target.value != "") {
                    setMessage({
                      ...message,
                      iColorMessage: "",
                      iImageMessage: "",
                    });
                  }
                  setPopupData({ ...popupData, iImage: e.target.value });
                }}
                cols={3}
                rows={6}
                className={`text-black px-2 py-1 rounded-sm mb-2 w-full ${
                  message.iImageMessage != "" || popupData.iImage == ""
                    ? "border-[#ff3333]"
                    : "border-black"
                } focus:outline-none border-b`}
              />
            </div>
          </form>
        )}
        {popType != "delete" && (
          <div className="mt-3 w-[88%] absolute bottom-12 space-x-8 py-2 text-center text-sm text-[#29191a]">
            Lưu ý: Nội dung chứa từ 2 phần tử cần được phân tách bằng dấu
            `&quot;`,`&quot;`
          </div>
        )}
        <div className="flex mt-3 w-[88%] absolute bottom-2 space-x-8 py-2 align-middle justify-center">
          <div
            onClick={confirmClicked}
            className="border px-2 py-1 border-black rounded-lg cursor-pointer hover:scale-105 transition-all hover:bg-[#0071e3] hover:border-[#0071e3] hover:text-white"
          >
            Xác nhận
          </div>
          <div
            onClick={() => {
              dispatch(actions.setPageLayer(!state.pageLayer));
              dispatch(
                actions.setCRUDAction({
                  ...state.crud,
                  execute: false,
                  productInfo: {
                    id: "",
                    name: "",
                    price: [],
                    color: [],
                    img: [],
                    optionToBuy: [],
                    discount: "",
                    date: -1,
                    type: "",
                    model: "",
                  },
                })
              );
            }}
            className="px-2 py-1 cursor-pointer hover:scale-105 transition-all hover:text-[#f20000]"
          >
            Hủy
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePopUp;
