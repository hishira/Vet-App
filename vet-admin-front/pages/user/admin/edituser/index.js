import {useState,useEffect} from 'react';
import UserView from '../../index';
import styles from '../../../../styles/UserEdit.module.css'

export default function EditUser(props){
    return<div> 
            <UserView userdata={props.userdata}>
                <div className={styles.usereditmaincontainer}>
                    Dupa
                    <canvas id='canvaschart'></canvas>
                </div>
            </UserView>
        </div>
}