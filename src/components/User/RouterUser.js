import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserFile from './component/UserFile/UserFile';
import UserManage from './component/UserManageAccount/UserManage';
import UserNotification from "./component/UserNotification/UserNotification"
import UserFileUpdate from "./component/UserFile/UserFileUpdate";
import UserFileEdit from './component/UserFile/UserFileEdit';
import UserManagePassword from './component/UserManageAccount/UserManagePassword';
import UserFileMe from './component/UserFile/UserFileMe';
import UserUploadAvatar from '../../pages/UserUploadAvatar';
function RouteUser(props) {
    return (
        <Switch>
            <Route path='/userfileme' component={UserFileMe}/>
            <Route path='/userfileupdate' component={UserFileUpdate}/>
            <Route path='/usermanage' component={UserManage} />
            <Route path ='/userfileedit' component={UserFileUpdate}/>
            <Route path='/useruploadavatar' component={UserUploadAvatar}/>
            <Route path='/usermanagepassword' component={UserManagePassword} />
            <Route path='/usernotification' component={UserNotification} />
        </Switch>
    );
}

export default RouteUser;