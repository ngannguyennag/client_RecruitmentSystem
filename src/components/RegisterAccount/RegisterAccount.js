import React, { useState } from "react";
import "./RegisterAccount.css";
// import {Link} from 'react-router-dom';

const initFormValue = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthday: "",
    phone: "",
}; 

const isEmptyValue = (value) => {
    return !value || value.trim().length <1;
};
const isEmailValid =(email) =>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
const isPhoneValid =(phone) =>{
    return  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone);

}
const isBirthdayValid = (birthday) =>{
    return /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/.test(birthday);
}
export default function RegisterPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({}); //Validate form

    const validateForm=() =>{
        const error = {}; //biến để lưu trữ các lỗi
        if(isEmptyValue(formValue.firstName)){
            error["firstName"] = "First Name is required";
        }
        if(isEmptyValue(formValue.lastName)){
            error["lastName"] = "Last Name is required";
        }
         if(isEmptyValue(formValue.userName)){
            error["userName"] = "User Name is required";
        }
        if(isEmptyValue(formValue.email)){
            error["email"] = "Email is required";
        }
        else if(!isEmailValid(formValue.email)){
            error["email"] = "Email is invalid";
        }
        if(isEmptyValue(formValue.password)){
            error["password"] = "Password is required";
        }
        if(isEmptyValue(formValue.confirmPassword)){
            error["confirmPassword"] = "Confirm Password is required";
        } else if(formValue.confirmPassword !== formValue.password){
            error["confirmPassword"] = "Confirm Password not match";
        }
        if(isEmptyValue(formValue.gender)){
            error["gender"] = "Gender is required";
        }
        if(isEmptyValue(formValue.birthday)){
            error["birthday"] = "Birthday is required";
        }
        else if(!isBirthdayValid(formValue.birthday)){
            error["birthday"] = "Birthday is invalid";
        }
        if(isEmptyValue(formValue.phone)){
            error["phone"] = "Phone is required";
        }
        else if(!isPhoneValid(formValue.phone)){
            error["phone"] = "Phone is invalid";
        }

        setFormError(error);
        return Object.keys(error).length ===0;
    };

    const handleChange = (event) => {
        const{ value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };
    const handleChangeGender = (event) => {
        const{ value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit= (event) =>{
        event.preventDefault(); // Không bị load lại trang
        if(validateForm()){
            console.log("form value", formValue);
        } else{
            console.log("form invalid");
        }
        console.log("form value", formValue )
    }
    return(
        <div className="register-page">
            <div className="register-form-container">
                <h1 className="title">Register Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="first-name" className="form-label"> First Name </label>
                        <input 
                        id="first-name"
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={formValue.firstName}
                        onChange={handleChange}
                        />
                        {formError.firstName && (
                            <div className="error-feedback">{formError.firstName}</div>
                        )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="last-name" className="form-label"> Last Name </label>
                        <input 
                        id="last-name"
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={formValue.lastName}
                        onChange={handleChange}
                        />
                        {formError.lastName && (
                            <div className="error-feedback">{formError.lastName}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="user-name" className="form-label"> User Name </label>
                        <input 
                        id="user-name"
                        className="form-control"
                        type="text"
                        name="userName"
                        value={formValue.userName}
                        onChange={handleChange}
                        />
                        {formError.userName && (
                            <div className="error-feedback">{formError.userName}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label"> Email  </label>
                        <input 
                        id="email"
                        className="form-control"
                        type="text"
                        name="email"
                        value={formValue.email}
                        onChange={handleChange}
                        />
                        {formError.email && (
                            <div className="error-feedback">{formError.email}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label"> Password </label>
                        <input 
                        id="password"
                        className="form-control"
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={handleChange}
                        />
                        {formError.password && (
                            <div className="error-feedback">{formError.password}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirm-password" className="form-label"> Confirm Password </label>
                        <input 
                        id="confirm-password"
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        value={formValue.confirmPassword}
                        onChange={handleChange}
                        />
                        {formError.confirmPassword && (
                            <div className="error-feedback">{formError.confirmPassword}</div>
                        )}
                    </div>
                    <div className="mb-2" >
                        <div className ="mb">
                        <label htmlFor="gender" className="form-label-gender"> Gender </label>
                        <input type="radio"
                        name="gender"
                        value="male"  
                        className="check"
                        onChange={handleChangeGender} /> Male   
                        <input type="radio"
                        name="gender"
                        value="female" 
                        className="check"
                        onChange={handleChangeGender} /> Female
                        <input type="radio"
                        name="gender"
                        value="prefer not to say" 
                        className="check"
                        onChange={handleChangeGender} /> Prefer not to say
                        {formError.gender && (
                            <div className="error-feedback">{formError.gender}</div>
                        )} 
                        </div>
                        
                        
                    </div>
                    <div className="mb-2">
                        <label htmlFor="birthday" className="form-label"> Birthday </label>
                        <input 
                        id="birthday"
                        className="form-control"
                        type="text"
                        name="birthday"
                        value={formValue.birthday}
                        onChange={handleChange}
                        />
                        {formError.birthday && (
                            <div className="error-feedback">{formError.birthday}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone" className="form-label"> Phone </label>
                        <input 
                        id="phone"
                        className="form-control"
                        type="text"
                        name="phone"
                        value={formValue.phone}
                        onChange={handleChange}
                        />
                        {formError.phone && (
                            <div className="error-feedback">{formError.phone}</div>
                        )}
                    </div>
                    <button type="submit" className="submit-btn">
                        Register
                    </button>
                    {/* <Link to="/login">Đăng nhập</Link> */}
                </form>
            </div>
        </div>
    )
}
// import * as React from "react";
// import { useForm } from "react-hook-form";

// export default function App() {
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       radio: ''
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit(console.log)}>
//       <input {...register("firstName", { required: true })} placeholder="First name" />

//       <input {...register("lastName", { minLength: 2 })} placeholder="Last name" />

//       <input {...register("radio")} type="radio" value="A" />
//       <input {...register("radio")} type="radio" value="B" />
//       <input {...register("radio")} type="radio" value="C" />

//       <input type="submit" />
//     </form>
//   );
// }
