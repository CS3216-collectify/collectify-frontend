import {useContext} from "react";

import AuthenticationContext from "../contexts/AuthenticationContext";

const useUserContext = () => useContext(AuthenticationContext);

export default useUserContext;