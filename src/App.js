import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import ResetScroll from './components/ResetScroll/ResetScroll';
import MyOrderPage from './pages/MyOrderPage';
import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ConfirmEmailPage from './components/Signup/ConfirmEmail';
import React from "react";
import UserFilePage from './pages/UserFilePage';
import CompanyPage from './pages/CompanyPage';
// import UserFileUpdatePage from './pages/UserFileUpdatePage';
import UserManageAccountPage from './pages/UserManageAccountPage';
import UserManagePasswordPage from './pages/UserManagePasswordPage';

// import { useRoutes} from "react-router-dom";
// import routes from "./configs/routes";

function App() {
  return (
    <div className="App">
  
      <Router>
        
        <ResetScroll></ResetScroll>

        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>

        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>

        <Route path="/forgot_password">
          <ForgotPasswordPage></ForgotPasswordPage>
        </Route>

        <Route path="/reset_password">
          <ResetPasswordPage></ResetPasswordPage>
        </Route>

        <Route path="/register/confirm">
          <ConfirmEmailPage></ConfirmEmailPage>
        </Route>
        <Route path="/register">
          <SignupPage></SignupPage>
        </Route>

        <Route path="/product">
          <ProductPage></ProductPage>
        </Route>

        <Route path="/detail/:id">
          <DetailPage></DetailPage>
        </Route>

        <Route path='/cart'>
          <CartPage></CartPage>
        </Route>

        <Route path='/order'>
          <OrderPage></OrderPage>
        </Route>

        <Route path='/orderSuccess'>
          <OrderSuccessPage></OrderSuccessPage>
        </Route>

        <Route path='/payment'>
          <PaymentPage></PaymentPage>
        </Route>

        <Route path='/MyOrder'>
          <MyOrderPage></MyOrderPage>
        </Route>

        <Route path='/search'>
          <SearchPage></SearchPage>
        </Route>

        <Route path='/chat'>
          <ChatPage></ChatPage>
        </Route>

        <Route path='/admin'>
          <AdminPage></AdminPage>
        </Route>
        
        <Route path='/user'>
          <UserPage></UserPage>
        </Route>

        <Route path='/userfile'>
          <UserFilePage></UserFilePage>
        </Route>

        {/* <Route path='/userfileupdate'>
          <UserFileUpdatePage></UserFileUpdatePage>
        </Route> */}

        <Route path='/usermanage'>
          <UserManageAccountPage></UserManageAccountPage>
        </Route>
       <Route path='/usermanagepassword'>
        <UserManagePasswordPage></UserManagePasswordPage>
       </Route>
        <Route path="/company">
          <CompanyPage></CompanyPage>
        </Route>
      </Router>
    </div>
  );
}

 export default App;
