import { UserStore } from "./userStore";

interface IStores { 
    userStore: UserStore
}

export const stores: IStores = {
    userStore: new UserStore(),
}