import { createContext, useContext, useState } from "react";
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL =  import.meta.env.API_URL;
export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const value = {
     setShowUserLogin,
     showUserLogin,
     setIsModalOpen,
     isModalOpen,
     axios
    }
    return(
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}

export const useAppContext = () =>{
    return useContext(AppContext);
}