import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Dashboard from '../components/DashBoard/DashBoard';
import ProfileCandidate from '../components/ProfileCandidate/ProfileCandidate'
import UserListApplication from '../components/UserListApplication/UserListApplication'
import DetailJob from '../../Job/components/DetailJob';
import UserNotification from './UserNotification/UserNotification';

function Routes(props) {
    return (
        <Switch>
            {/* <Route path='/user/' exact component={Dashboard}/> */}
            <Route path='/user/profile-candidate' exact component={ProfileCandidate}/>
            <Route path='/user/user-list-application' component={UserListApplication}></Route>
            <Route path="/detail_jobs/:jobId" component={DetailJob} />
            <Route path='/user/notification' component={UserNotification} />
        </Switch>
    );
}

export default Routes;