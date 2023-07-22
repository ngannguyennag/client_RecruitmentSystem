import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserFile from './component/UserFile/UserFile';
import UserManage from './component/UserManageAccount/UserManage';
import UserManageAccount from "./component/UserManageAccount/UserManageAccount";
import UserNotification from "./component/UserNotification/UserNotification"
import UserFileUpdate from "./component/UserFile/UserFileUpdate";
function RouteUser(props) {
    return (
        <Switch>
            <Route path='/userfile' component={UserFile}/>
            <Route path='/userfileupdate' component={UserFileUpdate}/>
            <Route path='/usermanage' component={UserManage} />
            <Route path='/usermanageaccount' component={UserManageAccount} />
            <Route path='/usernotification' component={UserNotification} />
        </Switch>
    );
}

export default RouteUser;