import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/DashBoard/DashBoard';
import ProfileCandidate from '../components/ProfileCandidate/ProfileCandidate'

function Routes(props) {
    return (
        <Switch>
            {/* <Route path='/user/' exact component={Dashboard}/> */}
            <Route path='/user/profile-candidate' exact component={ProfileCandidate}/>
        </Switch>
    );
}

export default Routes;