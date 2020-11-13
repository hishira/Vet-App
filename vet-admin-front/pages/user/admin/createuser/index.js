import UserView from '../../index'

export default function CreateUser(props){
    console.log(props)
    return<div>
        <UserView userdata={props.userdata}>
            <div>Dupa 123</div>
        </UserView>
    </div>
}