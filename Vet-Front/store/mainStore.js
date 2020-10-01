import {action,computed, observable,decorate,toJS} from 'mobx'

class MainStore{
    isLogged=false;
    timesArrayInCreateView = []
    cancelVisitDialog=false
    visitRelod=false
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
    setCancelVisit = value =>{
        this.cancelVisitDialog = value
    }
    get getCancelVisitDialog(){
        return this.cancelVisitDialog
    }
    setVisitReload = value =>{
        this.visitRelod = value
    }
    get getVisitReload(){
        return this.visitRelod
    }
}
decorate(MainStore,{
    isLogged:observable,
    getLoggedStatus:computed,
    setLoggedUser:action,
    timesArrayInCreateView:observable,
    getTimesArray:computed,
    setTimesArray:action,
    cancelVisitDialog:observable,
    getCancelVisitDialog:computed,
    setCancelVisit:action,
    visitRelod:observable,
    getVisitReload:computed,
    setVisitReload:action
})
export default new MainStore()