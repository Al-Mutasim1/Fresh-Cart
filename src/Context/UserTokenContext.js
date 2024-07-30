import { createContext, useState } from "react";

export const userToken = createContext();

export default function UserTokenProvider({ children }) {

    const [token, setToken] = useState(null);

    return <userToken.Provider value={{setToken , token}}>
        {children}
    </userToken.Provider>


}