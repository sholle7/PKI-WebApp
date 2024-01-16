import { createContext, useContext } from "react";
import { UserStore } from "./userStore";

interface IStores { 
    userStore: UserStore
}

export const stores: IStores = {
    userStore: new UserStore(),
}

export const StoreContext = createContext(stores)

export const useStore = () =>{
    return useContext(StoreContext)
}