import {useStaticRendering} from 'mobx-react'

import UserStore from './userStore'

const isServer = typeof window === 'undefined';

let store = null;

export default function initializeStore(){
    if(isServer){
        return {
            userStore: new UserStore()
        }
    }
    if(store === null){
        store={
            userStore: new UserStore()
        }
    }
    return store;
}