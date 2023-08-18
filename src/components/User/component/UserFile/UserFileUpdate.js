import React, { useState, useEffect } from 'react';
import './UserFile.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SignupUser } from '../../../../actions/UserAction';
import {Link} from "react-router-dom";

function UserFileUpdate(props) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const history = useHistory();
    const [confirmPassword, setConfirmPassword] = useState('')

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => {
      console.log(data);
        if(password === confirmPassword) {
            dispatch(SignupUser(data))            
        } else{
            alert("wrong repeat password")
        }
    }
  const user = useSelector((state) => state.userSignup);

 
  const { userInfo, error } = user;
    useEffect(() => {
      if (userInfo) {
        history.push("/");
      }
    });
    return (
      <div className="user-page">
        <div className="userUp">

        <h2>Sửa thông tin liên hệ</h2>
        <form onSubmit={handleSubmit(onSubmit)} classname="form-signup">
          <div className="form">
            <div className="form-input"> FirstName
              <input {...register("firstname")}  required></input>
            </div>
            <div className='form-input'> LastName
              <input {...register("lastname")}  required></input>
            </div>
          </div>
          <div className='form'>
            <div className='form-input'> UserName
              <input {...register("username")}  required></input>
            </div>
            <div className='form-input'> Email
              <input
                {...register("email")}
                type="email"
                required
              ></input>
            </div>
          </div>
         <div className="form">
          <div className='form-input'> Phone
            <input
              {...register("phone")}
              type="phone"
              required
            ></input>
          </div>
          <div className='form-input'> Birthday
            <input {...register("birthday")}  required></input>
          </div>
         </div>

          <div className='form-input'> Gender
            <div className='check'>
              <span>
                <input {...register("gender")} type="radio" value="MALE" />Male
              </span>
              <span>
                <input {...register("gender")} type="radio" value="FEMALE" />Female
              </span>
              <span>
                <input {...register("gender")} type="radio" value="PREFER NOT TO SAY" />Prefer not to say
              </span>
            </div>
          </div> 
          <div className="button">
            <Link className="button1" to="/userfile"> 
                <input className='buttonDestroy' type="submit" value="Hủy"></input>
            </Link>
            <Link className="button2" to="/userfile">
                <input className='buttonSave' type="submit" value="Lưu"></input> 
            </Link>      
           </div>
        </form>
        </div>
        
        
      </div>
    );
}

export default UserFileUpdate;