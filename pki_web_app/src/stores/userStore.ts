import { User } from "@/models/User";
import { makeAutoObservable } from "mobx";

export class UserStore {
    
    isLoggedIn: boolean = false;
    loggedUser: User | null = null;

    constructor (){
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        this.isLoggedIn = storedIsLoggedIn === "true";
    
        const storedUser = localStorage.getItem("user");
        this.loggedUser = storedUser ? JSON.parse(storedUser) : null;
        makeAutoObservable(this);
    }

    get isUserLoggedIn(): boolean{
        return this.isLoggedIn;
    }

    login = async (user: User) => {
        try {           

            // const loggedUser: User | null = await agent.UserApi.login(user);
    
            // if (loggedUser !== null) {

            //     this.isLoggedIn = true;
            //     this.loggedUser = loggedUser;

            //     localStorage.setItem('isLoggedIn', 'true');
            //     localStorage.setItem('user', JSON.stringify(loggedUser));

            //     router.navigate("/mainPage");
            //     return true;
            // } 

            // else {
            //     return false;
            // }
        } catch (error) {
            return false;
        }
    }

    logout = () => {
        this.isLoggedIn = false;
        this.loggedUser = null;

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');

        //router.navigate("/");
    }


}