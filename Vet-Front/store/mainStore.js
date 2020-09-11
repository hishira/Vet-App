import {action,computed, observable,decorate} from 'mobx'

class MainStore{
    isLogged=false;
    
    get getLoggedStatus(){
        return this.isLogged
    }
    
    setLoggedUser = logged =>{
        this.isLogged = logged
    }
}
decorate(MainStore,{
    isLogged:observable,
    getLoggedStatus:computed,
    setLoggedUser:action
})
export default new MainStore()