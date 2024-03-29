import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { LayoutRouteProps } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useStore, actions } from "../store";

function Layout({ children }: { children: ReactElement }) {
  const [state, dispatch] = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(state.pageLayer);
  }, [state.pageLayer]);

  return (
    <div className="relative">
      <div
        onClick={() => {
          dispatch(actions.setSearch(""));
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
        className={`absolute w-full h-full bg-[#0c0c0d] z-40 ${
          isMounted
            ? "opacity-75 transition-all duration-1000 ease-out"
            : "opacity-0"
        } ${state.pageLayer ? "visible" : "hidden"}`}
      ></div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}

export default Layout;
