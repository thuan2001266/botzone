import { LayoutRouteProps } from "react-router-dom";
import Header from "./Header";

function Layout({ children }) {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
}

export default Layout;
