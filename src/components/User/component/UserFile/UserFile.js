// import React, { useState, useEffect } from 'react';
// import './UserFile.css'
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import { SignupUser } from '../../../../actions/UserAction';
// import {Link} from "react-router-dom";
// import { EditOutlined } from '@ant-design/icons';
// import { getAccountInfo } from '../../../../actions/UserAction';

// function UserFile(props) {
//     const dispatch = useDispatch()
//     const [password, setPassword] = useState('')
//     const history = useHistory();
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const token = JSON.parse(localStorage.getItem('userInfo')).access_token

//     const { register, handleSubmit, watch, formState: { errors } } = useForm()
//     const onSubmit = data => {
//       console.log(data);
//         if(password === confirmPassword) {
//             dispatch(SignupUser(data))            
//         } else{
//             alert("wrong repeat password")
//         }
//     }
//   const user = useSelector((state) => state.userSignup);

//   const users = useSelector(state => state.getAccountInfo.user)
//   console.log(typeof(users)); 
//   console.log(users)

//     useEffect(() => {
//         dispatch(getAccountInfo(token))
//     }, [dispatch])
//   const { userInfo, error } = user;
//     useEffect(() => {
//       if (userInfo) {
//         history.push("/");
//       }
//     });

//     return (
//       <div className="signup-page">
//         <div className="signup">
//         <div className="infor">
//             <div className='inforText'>Thông tin cá nhân</div>
//             <div className="inforImage">
//                 <Link className="account-icon" to="/userfileupdate"><EditOutlined /></Link>
//             </div>
//         </div>
        
//         <form onSubmit={handleSubmit(onSubmit)} classname="form-signup">
//           <div className="form">
//             <div className="form-input"> FirstName
//               <input {...register("firstname")} value={users && users.firstName} required></input>
//             </div>
//             <div className='form-input'> LastName
//               <input {...register("lastname")} value={users && users.lastName}  required></input>
//             </div>
//           </div>
//           <div className='form'>
//             <div className='form-input'> UserName
//               <input {...register("username")} value={users && users.username}  required></input>
//             </div>
//             <div className='form-input'> Email
//               <input
//                 {...register("email")}
//                 type="email"
//                 value={users && users.email}
//                 required
//               ></input>
//             </div>
//           </div>         
//          <div className="form">
//           <div className='form-input'> Phone
//             <input
//               {...register("phone")}
//               type="phone"
//               value={users && users.phoneNumber}
//               required
//             ></input>
//           </div>
//           <div className='form-input'> Birthday
//             <input {...register("birthday")}  value={users && users.birthday} required></input>
//           </div>
//          </div>

//           <div className='form-input'> Gender
//             <div className='check'>
//               <span>
//                 <input {...register("gender")} type="radio" value="MALE" />Male
//               </span>
//               <span>
//                 <input {...register("gender")} type="radio" value="FEMALE" />Female
//               </span>
//               <span>
//                 <input {...register("gender")} type="radio" value="PREFER NOT TO SAY" />Prefer not to say
//               </span>
//             </div>
//           </div> 
//         </form>
//         </div>
        
        
//       </div>
//     );
// }

// export default UserFile;

// import React, { useState, useEffect } from 'react';
// import './UserFile.css'
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import { SignupUser, getAccountInfo,getAccountUpdate } from '../../../../actions/UserAction';
// import {Link} from "react-router-dom";
// import { EditOutlined } from '@ant-design/icons';


// function UserFile(props) {
//     const dispatch = useDispatch()
//     const [password, setPassword] = useState('')
//     const history = useHistory();
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [isEditMode, setIsEditMode] = useState(false);

//     const { register, handleSubmit, watch, formState: { errors } } = useForm()
//     const onSubmit = data => {
//         console.log(data);
//         if (password === confirmPassword) {
//             dispatch(SignupUser(data))
//         } else {
//             alert("wrong repeat password")
//         }
//     }

//     const user = useSelector((state) => state.userSignup);
//     const users = useSelector(state => state.getAccountInfo.user)

//     useEffect(() => {
//         const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
//         dispatch(getAccountInfo(token));
//     }, [dispatch])

//     const { userInfo, error } = user;

//     useEffect(() => {
//         if (userInfo) {
//             history.push("/");
//         }
//     });

//     const handleEditClick = () => {
//         setIsEditMode(true);
//     }

//     const handleCancelClick = () => {
//         setIsEditMode(false);
//     }

//     const handleSaveClick = () => {
//         // Perform save logic here
//         setIsEditMode(false);
//     }

//     return (
//         <div className="signup-page">
//             <div className="signup">
//                 <div className="infor">
//                     <div className='inforText'>Thông tin cá nhân</div>
//                     <div className="inforImage">
//                         {!isEditMode && <Link className="account-icon" onClick={handleEditClick}><EditOutlined /></Link>}
//                     </div>
//                 </div>

//                 {isEditMode ? (
//                     <form onSubmit={handleSubmit(onSubmit)} classname="form-signup">
//                         <div className="form">
//                             <div className="form-input"> FirstName
//                                 <input {...register("firstname")} defaultValue={users && users.firstName} required></input>
//                             </div>
//                             <div className='form-input'> LastName
//                                 <input {...register("lastname")} defaultValue={users && users.lastName} required></input>
//                             </div>
//                         </div>
//                         <div className='form'>
//                             <div className='form-input'> UserName
//                                 <input {...register("username")} defaultValue={users && users.username} required></input>
//                             </div>
//                             <div className='form-input'> Email
//                                 <input
//                                     {...register("email")}
//                                     type="email"
//                                     defaultValue={users && users.email}
//                                     required
//                                 ></input>
//                             </div>
//                         </div>
//                         <div className="form">
//                             <div className='form-input'> Phone
//                                 <input
//                                     {...register("phone")}
//                                     type="phone"
//                                     defaultValue={users && users.phoneNumber}
//                                     required
//                                 ></input>
//                             </div>
//                             <div className='form-input'> Birthday
//                                 <input {...register("birthday")} defaultValue={users && users.birthday} required></input>
//                             </div>
//                         </div>

//                         <div className='form-input'> Gender
//                             <div className='check'>
//                                 <span>
//                                     <input {...register("gender")} type="radio" value="MALE" />Male
//                                 </span>
//                                 <span>
//                                     <input {...register("gender")} type="radio" value="FEMALE" />Female
//                                 </span>
//                                 <span>
//                                     <input {...register("gender")} type="radio" value="PREFER NOT TO SAY" />Prefer not to say
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="button">
//                             <button className='buttonDestroy' type="button" onClick={handleCancelClick}>Hủy</button>
//                             <button className='buttonSave' type="submit">Lưu</button>
//                         </div>
//                     </form>
//                                 ) : (
//                                     <form onSubmit={handleSubmit(onSubmit)} classname="form-signup">
//                         <div className="form">
//                             <div className="form-input"> FirstName
//                                 <input {...register("firstname")} defaultValue={users && users.firstName} required></input>
//                             </div>
//                             <div className='form-input'> LastName
//                                 <input {...register("lastname")} defaultValue={users && users.lastName} required></input>
//                             </div>
//                         </div>
//                         <div className='form'>
//                             <div className='form-input'> UserName
//                                 <input {...register("username")} defaultValue={users && users.username} required></input>
//                             </div>
//                             <div className='form-input'> Email
//                                 <input
//                                     {...register("email")}
//                                     type="email"
//                                     defaultValue={users && users.email}
//                                     required
//                                 ></input>
//                             </div>
//                         </div>
//                         <div className="form">
//                             <div className='form-input'> Phone
//                                 <input
//                                     {...register("phone")}
//                                     type="phone"
//                                     defaultValue={users && users.phoneNumber}
//                                     required
//                                 ></input>
//                             </div>
//                             <div className='form-input'> Birthday
//                                 <input {...register("birthday")} defaultValue={users && users.birthday} required></input>
//                             </div>
//                         </div>

//                         <div className='form-input'> Gender
//                             <div className='check'>
//                                 <span>
//                                     <input {...register("gender")} type="radio" value="MALE" />Male
//                                 </span>
//                                 <span>
//                                     <input {...register("gender")} type="radio" value="FEMALE" />Female
//                                 </span>
//                                 <span>
//                                     <input {...register("gender")} type="radio" value="PREFER NOT TO SAY" />Prefer not to say
//                                 </span>
//                             </div>
//                         </div>
//                     </form>
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 }
                
//                 export default UserFile;
                
import React, { useState, useEffect } from 'react';
import './UserFile.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SignupUser, getAccountInfo, getAccountUpdate } from '../../../../actions/UserAction';
import { Link } from "react-router-dom";
import { EditOutlined } from '@ant-design/icons';



function UserFile(props) {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // Thêm biến trạng thái isSaved
  
    const { register, handleSubmit, formState: { errors } } = useForm();
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const onSubmit = data => {
      console.log(data);
      // if (password === confirmPassword) {
        dispatch(getAccountUpdate(token,data));
        setIsSaved(true); // Đã lưu thông tin thành công
      // } else {
        // alert("Mật khẩu nhập lại không đúng");
      // }
    };
  
    const userSignup = useSelector((state) => state.userSignup);
    const users = useSelector(state => state.getAccountInfo.user);
  
    useEffect(() => {
      dispatch(getAccountInfo(token));
    }, [dispatch]);

    useEffect((data) => {
      dispatch(getAccountUpdate(token, data));
    }, [dispatch]);
    
    const { userInfo, error } = userSignup;
  
    useEffect(() => {
      if (userInfo) {
        history.push("/");
      }
    }, [userInfo, history]);
  
    const handleEditClick = () => {
      setIsEditMode(true);
      setIsSaved(false); // Reset biến trạng thái khi chuyển sang chế độ chỉnh sửa
    };
  
    const handleCancelClick = () => {
      setIsEditMode(false);
      setIsSaved(false); // Reset biến trạng thái khi hủy chỉnh sửa
    };
  
    const handleSaveClick = () => {
      console.log(users);
      getAccountUpdate(token, users);
      // Thực hiện logic lưu tại đây
      setIsEditMode(false);
      setIsSaved(true); // Đã lưu thông tin thành công
    };
  
    const genderValue = users && users.gender; 
  return (
    <div className="signup-page">
      <div className="signup">
        <div className="infor">
          <div className='inforText'>Thông tin cá nhân</div>
          <div className="inforImage">
            {!isEditMode && !isSaved && <Link className="account-icon" onClick={handleEditClick}><EditOutlined/></Link>}
          </div>
        </div>

        {isEditMode ? (
          <form onSubmit={handleSubmit(onSubmit)} className="form-signup">
            <div className="form">
              <div className="form-input">FirstName
                <input {...register("firstname")} defaultValue={users && users.firstName} required></input>
              </div>
              <div className='form-input'>LastName
                <input {...register("lastname")} defaultValue={users && users.lastName} required></input>
              </div>
            </div>
            <div className='form'>
              <div className='form-input'>Username
                <input {...register("username")} defaultValue={users && users.username} required></input>
              </div>
              <div className='form-input'>Email
                <input
                  {...register("email")}
                  type="email"
                  defaultValue={users && users.email}
                  required
                ></input>
              </div>
            </div>
            <div className="form">
              <div className='form-input'>Phone Number
                <input
                  {...register("phone")}
                  type="phone"
                  defaultValue={users && users.phoneNumber}
                  required
                ></input>
              </div>
              <div className='form-input'>Date of Birth
                <input {...register("birthday")} defaultValue={users && users.birthday} required></input>
              </div>
            </div>

            <div className='form-input'>Gender
              <div className='check'>
                <span>
                  <input {...register("gender")} type="radio" checked={genderValue === "MALE"} />Male
                  </span>
                <span>
                  <input {...register("gender")} type="radio" checked={genderValue === "FEMALE"}/>Female
                </span>
                <span>
                  <input {...register("gender")} type="radio" checked={genderValue === "NA"} />Prefer not to say
                </span>
              </div>
            </div>
            <div className="button">
              {<button className='buttonDestroy' type="button" onClick={handleCancelClick}>Hủy</button>}
              {!isSaved && <button className='buttonSave' type="submit" onClick={handleSaveClick}>Lưu</button>}
            </div>
          
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}
          className="form-signup">
        <div className="form">
            <div className="form-input">FirstName
                <input {...register("firstname")} defaultValue={users && users.firstName} required></input>
            </div>
            <div className='form-input'>LastName
                <input {...register("lastname")} defaultValue={users && users.lastName} required></input>
            </div>
        </div>
        <div className='form'>
            <div className='form-input'>Username
                <input {...register("username")} defaultValue={users && users.username} required></input>
            </div>
            <div className='form-input'>Email
                <input
                {...register("email")}
                type="email"
                defaultValue={users && users.email}
                required
                ></input>
            </div>
        </div>
        <div className="form">
            <div className='form-input'>Phone Number
                <input
                {...register("phone")}
                type="phone"
                defaultValue={users && users.phoneNumber}
                required
                ></input>
            </div>
            <div className='form-input'>Date of Birth
            <input {...register("birthday")} defaultValue={users && users.birthday} required></input>
            </div>
        </div>

        <div className='form-input'>Gender
          <div className='check'>
            <span>
              <input {...register("gender")} type="radio"  checked={genderValue === "MALE"} />Male
            </span>
            <span>
              <input {...register("gender")} type="radio"  checked={genderValue === "FEMALE"} />Female
            </span>
            <span>
              <input {...register("gender")} type="radio"  checked={genderValue === "NA"} />Prefer not to say
            </span>
            {/* {users && users.gender} */}
          </div>
        </div>
        {/* {!isSaved && (
              <div className="button">
                <button className='buttonEdit' type="button" onClick={handleEditClick}>Chỉnh sửa</button>
              </div>
            )} */}
      </form>
    )}
  </div>
</div>
);
}

export default UserFile;