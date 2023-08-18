import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserFile from './component/UserFile/UserFile';
import UserManage from './component/UserManageAccount/UserManage';
import UserNotification from "./component/UserNotification/UserNotification"
import UserFileUpdate from "./component/UserFile/UserFileUpdate";
import UserManagePassword from './component/UserManageAccount/UserManagePassword';
function RouteUser(props) {
    return (
        <Switch>
            <Route path='/userfile' component={UserFile}/>
            <Route path='/userfileupdate' component={UserFileUpdate}/>
            <Route path='/usermanage' component={UserManage} />
            <Route path='/usermanagepassword' component={UserManagePassword} />
            <Route path='/usernotification' component={UserNotification} />
        </Switch>
    );
}

export default RouteUser;