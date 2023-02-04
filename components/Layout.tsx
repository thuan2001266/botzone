import { JSXElementConstructor, ReactElement } from "react";
import { LayoutRouteProps } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}

export default Layout;
