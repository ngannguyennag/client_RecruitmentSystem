import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Dashboard from '../components/DashBoard/DashBoard';
import ProfileCandidate from '../components/ProfileCandidate/ProfileCandidate'
import UserListApplication from '../components/UserListApplication/UserListApplication'
import DetailJob from '../../Job/components/DetailJob';
import UserNotification from './UserNotification/UserNotification';
import UserManageAccount from './UserManageAccount/UserManage'
import UserManagePassword from './UserManageAccount/UserManagePassword';
function Routes(props) {
    return (
        <Switch>
            {/* <Route path='/user/' exact component={Dashboard}/> */}
            <Route path='/candidate/profile-candidate' exact component={ProfileCandidate}/>
            <Route path='/candidate/list-application' component={UserListApplication}></Route>
            <Route path="/detail_jobs/:jobId" component={DetailJob} />
            <Route path="/candidate/manage-account" component={UserManageAccount}></Route>
            <Route path='/candidate/notification' component={UserNotification} />
            <Route path='/candidate/manage-password' component={UserManagePassword}></Route>
        </Switch>

    );
}

export default Routes;