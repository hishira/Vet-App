import {makeAutoObservable,observable} from 'mobx'
import {createContext} from 'react'
class UserStore{
    isLogged=false;
    constructor(){
        makeAutoObservable(this);
    }
    get getLoggedStatus(){
        return this.isLogged;
    }
    setLoggedStatus = logged =>{
        this.isLogged = logged
    }
}

export default createContext(observable(new UserStore()));