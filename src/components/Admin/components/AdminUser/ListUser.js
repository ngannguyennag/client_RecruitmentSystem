import React from 'react';
import User from './User';


function ListUser(props) {
    const {users} = props
    console.log(users);

    return (
        <div className="admin-user-list">
            <table>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>email</th>
                    <th>first_name</th>
                    <th>last_name</th>
                    <th>gender</th>
                    <th>phone_number</th>
                    <th>role_name</th>
                </tr>
                {
                    users.map((item, index) => (<User user={item} number={index}></User>))
                }
            </table>
        </div>
    );
}

export default ListUser;