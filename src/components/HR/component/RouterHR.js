import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/DashboardHR';
import HRManageAccount from './HRManageAccount/HRManageAccount';
import HRFileCompany from './HRFileCompany/HRFileCompany'
import HRCreateWork from './HRCreateWork/HRCreateWork';
import HRManageWork from './HRManageWork/HRManageWork';
import HRListApplication from './HRListApplication/HRListApplication';
function Routes(props) {
    return (
        <Switch>
            <Route path='/hr/' exact component={Dashboard}/>
            <Route path = '/hr/manage-account' component={HRManageAccount}></Route>
            <Route path = '/hr/file_company' component ={HRFileCompany}></Route>
            <Route path = '/hr/create_work' component ={HRCreateWork}></Route>
            <Route path = '/hr/manage_work' component ={HRManageWork}></Route>
            <Route path = '/hr/list_application' component={HRListApplication}></Route>
        </Switch>
    );
}

export default Routes;