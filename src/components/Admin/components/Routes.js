import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AdminProduct from './AdminProduct/AdminProduct';
import AdminCreate from './AdminProduct/AdminCreate'
import AdminUpdate from './AdminProduct/AdminUpdate'
// import AdminOrder from './AdminOrder/AdminOrder'
import AdminUser from './AdminUser/AdminUser';
import AppChat from './AppChat/AppChat'
import ReviewProduct from './AdminProduct/ReviewProduct/ReviewProduct';
import DataFilterProduct from './AdminProduct/DataFilterProduct/DataFilterProduct';
import AdminManageCompany from './AdminManageCompany/AdminManageCompany';
import AdminManageJob from './AdminManageJob/AdminManageJob';
import AdminManageAccount from './AdminManageAccount/AdminManageAccount';

function Routes(props) {
    return (
        <Switch>
            <Route path='/admin/' exact component={Dashboard}/>
            <Route path='/admin/customer' component={AdminUser}/>
            <Route path='/admin/product/create' component={AdminCreate}/>
            <Route path='/admin/product/update/info' component={DataFilterProduct}/>
            <Route path='/admin/product/update/:id' component={AdminUpdate}/>
            <Route path='/admin/product/reviewProduct/:id' component={ReviewProduct}/>
            <Route path='/admin/product' component={AdminProduct}/>
            <Route path='/admin/manage-company' component={AdminManageCompany}/>
            <Route path='/admin/manage-job' component={AdminManageJob}/>
            <Route path = '/admin/manage-account' component={AdminManageAccount}></Route>
            <Route path='/admin/chat' component={AppChat}/>
        </Switch>
    );
}

export default Routes;