import React, {FunctionComponent} from "react";

/**
 * User Type
 *
 * @public
 * */
export type User = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
};

/**
 * List of sample users
 *
 * */
const users :Array<User> = [
    {
        id:1,
        name:'John Doe',
        email: 'john@doe.com',
        phone_number: '0700112233',
    },
    {
        id:2,
        name:'Jane Doe',
        email: 'jane@doe.com',
        phone_number: '0700112234',
    },
    {
        id:3,
        name:'Luke Shaw',
        email: 'luke@shaw.com',
        phone_number: '0700112235',
    },
];

/**
 * User List Props
 *
 * @public
 * */
export interface UserListProps{}

/**
 * User List Page
 *
 * @desc Page with a table of list of users
 *
 * @param props {@link UserListProps}
 *
 * @public
 * */
const UserList :FunctionComponent<UserListProps> = (props)=>{
    const [childWindow, setChildWindow] = React.useState<Window|null>(null);
    const [childWindowConfirmed, setChildWindowConfirmed] = React.useState<boolean>(false);

    const handleEditUser = (user :User)=>{
        if (!childWindow){
            const newWindow :Window|null = window.open(`/users/${user.id}`,`EditUser${user.id}`,'width=750,height=500,left=50,top=50');
            if (newWindow){
                setTimeout(()=>{
                    newWindow.postMessage({
                        messageId:'EditUser',
                        origin: `${window.location.origin}`,
                        parentData: user,
                    },`${window.location.origin}`);
                },1000);
                setChildWindow(newWindow);
            }
        }
    }

    const handleChildWindowMessageEvent = (event: MessageEvent) => {
        console.log(event);
        if (event.data.messageId && (event.data.messageId === "ChildWindowConfirm")){
            setChildWindowConfirmed(true);
        }
    }

    const handleChildWindowUnload = ()=>{
        console.log('Child window has closed!!!', childWindowConfirmed);
        if (childWindowConfirmed){
            setChildWindow(null);
            setChildWindowConfirmed(false);
        }
    }

    React.useEffect(()=>{
        window.addEventListener("message", handleChildWindowMessageEvent, false);

        return ()=>{
            window.removeEventListener("message",handleChildWindowMessageEvent);
        }
    },[]);

    React.useEffect(()=>{
        if (childWindow){
            childWindow.addEventListener('unload',handleChildWindowUnload);
        }

        return ()=>{
            childWindow?.removeEventListener('unload',handleChildWindowUnload);
        }
    },[childWindow, childWindowConfirmed]);

    return (
        <div style={{width:'100%', padding: 5}}>
            <h3>Users List</h3>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user,i)=>
                        <tr key={i}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone_number}</td>
                            <td>
                                <button onClick={()=>handleEditUser(user)}>Edit this user</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;