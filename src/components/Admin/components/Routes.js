import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AdminUser from './AdminUser/AdminUser';
import AdminManageCompany from './AdminManageCompany/AdminManageCompany';
import AdminManageJob from './AdminManageJob/AdminManageJob';
import AdminManageAccount from './AdminManageAccount/AdminManageAccount';
import AdminManageRole from './AdminManageRole/AdminManageRole';
import AdminManageSkill from './AdminManageSkill/AdminManageSkill';
import AdminManageDegree from './AdminManageDegree/AdminManageDegree';
import AdminManageIndustry from './AdminManageIndustry/AdminManageIndustry';
import AdminManageJobType from './AdminManageJobType/AdminManageJobType';
import AdminManageCategory from './AdminManageCategory/AdminManageCategory';

function Routes(props) {
    return (
        <Switch>
            <Route path = '/admin/' exact component={Dashboard}/>
            <Route path = '/admin/manage-candidate' component={AdminUser}/>
            <Route path = '/admin/manage-company' component={AdminManageCompany}/>
            <Route path = '/admin/manage-job' component={AdminManageJob}/>
            <Route path = '/admin/manage-role' component ={AdminManageRole}></Route>
            <Route path = '/admin/manage-skill' component = {AdminManageSkill}></Route>
            <Route path = '/admin/manage-degree' component = {AdminManageDegree}></Route>
            <Route path = '/admin/manage-industry' component = {AdminManageIndustry}></Route>
            <Route path = '/admin/manage-jobtype' component = {AdminManageJobType}></Route>
            <Route path = '/admin/manage-category' component = {AdminManageCategory}></Route>
            <Route path = '/admin/manage-account' component={AdminManageAccount}></Route>
        </Switch>
    );
}

export default Routes;