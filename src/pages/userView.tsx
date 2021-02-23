import React, {FunctionComponent} from "react";
import {RouteComponentProps, match} from "react-router-dom";
import {User} from "./userList";

/**
 * User View Props
 *
 * @public
 * */
export interface UserViewProps{
    match ?: match<{id : string}>
}

/**
 * User View Page
 *
 * @desc View user details from parent page
 *
 * @param props {@link UserViewProps}
 *
 * @public
 * */
const UserView :FunctionComponent<UserViewProps & RouteComponentProps> = (props)=>{
    const [parentWindow, setParentWindow] = React.useState<Window|null>(null);
    const [user, setUser] = React.useState<User|null>(null);

    const sendMessageToParent = ()=>{
        if (parentWindow) parentWindow.postMessage(`User view with id ${props.match.params.id} has messaged!!!`,`${window.location.origin}`);
    }

    React.useEffect(()=>{
        if (window.opener){
            setParentWindow(window.opener);
            window.addEventListener("message", (event) => {
                if (event.data.parentData){
                    setUser(event.data.parentData as User);
                }
            }, false);

            window.opener.postMessage({
                messageId: 'ChildWindowConfirm',
                origin: `${window.location.origin}`,
            },`${window.location.origin}`);
        }
    },[]);

    return (
        <div style={{padding: 20}}>
            <p>Currently viewing user with id : {props.match.params.id}</p>

            {user &&
            <table>
                <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>ID</td>
                    <td>{user.id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>{user.phone_number}</td>
                </tr>
                </tbody>
            </table>
            }

            <p>
                <button onClick={sendMessageToParent}>Send message to parent window (Users List)</button>
            </p>
        </div>
    );
}

export default UserView;