import {action,computed, observable,decorate,toJS} from 'mobx'

class MainStore{
    isLogged=false;
    timesArrayInCreateView = []
    get getLoggedStatus(){
        return this.isLogged
    }
    setLoggedUser = logged =>{
        this.isLogged = logged
    }
    get getTimesArray(){
        return toJS(this.timesArrayInCreateView)
    }
    setTimesArray = arr =>{
        this.timesArrayInCreateView = arr
    }
}
decorate(MainStore,{
    isLogged:observable,
    getLoggedStatus:computed,
    setLoggedUser:action,
    timesArrayInCreateView:observable,
    getTimesArray:computed,
    setTimesArray:action
})
export default new MainStore()