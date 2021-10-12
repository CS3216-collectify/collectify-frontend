import {useContext} from "react";

import ToastContext from "../contexts/ToastContext";

const useToastContext = () => useContext(ToastContext);

export default useToastContext;