import { useContext } from "react";
import { default as Context } from "./Context";

export const useStore = () => {
    const [state, dispatch] = useContext(Context);
    return [state, dispatch];
};
