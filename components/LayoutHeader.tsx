import { ReactElement, useEffect, useState } from "react";
import Header from "./Header";
import { useStore, actions } from "../store";

function LayoutHeader({ children }: { children: ReactElement }) {
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
        }}
        className={`absolute w-full h-full bg-[#0c0c0d] z-40 ${
          isMounted
            ? "opacity-75 transition-all duration-1000 ease-out"
            : "opacity-0"
        } ${state.pageLayer ? "visible" : "hidden"}`}
      ></div>
      <Header></Header>
      {children}
    </div>
  );
}

export default LayoutHeader;
