"use client"
import { User } from "@/models/User";
import { makeAutoObservable } from "mobx";
import { users } from '@/database/database'

export class UserStore {
    
    isLoggedIn: boolean = false;
    loggedUser: User | null = null;

    constructor (){
        if (typeof window !== 'undefined') {
            const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
            this.isLoggedIn = storedIsLoggedIn === "true";
        
            const storedUser = localStorage.getItem("user");
            this.loggedUser = storedUser ? JSON.parse(storedUser) : null;
            makeAutoObservable(this);
        }
    }

    get isUserLoggedIn(): boolean{
        return this.isLoggedIn;
    }

    login = (username: string, password: string) => {
        try {           
            users.forEach(user => {
                if(user.username == username && user.password == password) {
                  this.isLoggedIn = true
                  this.loggedUser = user
                }          
              });
          
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(this.loggedUser));

            return true

        } catch (error) {
            return false;
        }
    }

    logout = () => {
        this.isLoggedIn = false;
        this.loggedUser = null;

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
    }


}