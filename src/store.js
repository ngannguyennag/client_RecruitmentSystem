import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  getCandidateInfoReducer,
  getCandidateUpdateReducer,
  uploadCVReducer,
  uploadImageReducer,
  getAllCandidateReducer,
  getCandidateByNameReducer,
} from "./reducers/CandidateReducer";
import {
  getAllProductReducer,
  getProductByIdReducer,
  searchProductReducer,
} from "./reducers/ProductReducer";
import { CartReducer } from "./reducers/CartReducer";
import {
  addressReducer,
  getOrderByUserReducer,
  OrderInfoReducer,
  orderPayReducer,
} from "./reducers/OrderReducer";
import { ChatReducer } from "./reducers/ChatReducer";
import {
  SelectListReducer,
  UpdateSelectListReducer,
} from "./reducers/SelectListReducer";
import {
  ListTypeProductReducer,
  TypeProductReducer,
} from "./reducers/ListTypeProductReducer";
import { InfoGhnReducer } from "./reducers/GhnReducer";
import {
  getCompanyTopReducer,
  getAllCompany,
  getAllCompanyByAdminReducer,
  getDetailCompanyReducer,
  getProvinceReducer,
  getDistrictReducer,
  getWardsReducer,
  getIndustryReducer,
  getCompanyByNameReducer,
  getCompanyByIdReducer,
} from "./reducers/CompanyReducer";
import {
  getCategoryReducer,
  getHotCategoryReducer,
} from "./reducers/CategoryReducer";
import {
  getAllJobByAdminReducer,
  getJobTopReducer,
  getAllJobByCompanyReducer,
  getJobByNameReducer,
  getAllJob,
  createWorkReducer,
  getJobByIdReducer,
  getJobByStatusReducer,
  getCompanyManageJobByIdReducer,
} from "./reducers/JobReducer";
import {
  updateCompanyBasicInfoReducer,
  updateCompanyAddressReducer,
  uploadCompanyImageReducer,
  updateCompanyDescReducer,
  updateCompanyMediaReducer,
} from "./reducers/CompanyReducer";
import {
  applyJobReducer,
  getApplicationCandidateByJobAndStatusReducer,
  getApplicationIntervieweeByJobAndStatusReducer,
  getRecruitmentCandidateReducer,
  getRecruitmentManageAddInterviewReducer,
  getRecruitmentManageChangeStatusReducer,
} from "./reducers/RecruitmentReducer";
import {
  CandidateSignUpReducer,
  LoginReducer,
  addRoleByAdminReducer,
  deleteRoleByAdminReducer,
  getAllRoleReducer,
  pageRoleByAdminReducer,
  saveRoleByAdminReducer,
} from "./reducers/AuthenticationReducer";
import { getNotificationReducer } from "./reducers/NotificationReducer";
import { getStatisticalByAdminReducer, getStatisticalByCompanyReducer } from "./reducers/SystemReducer";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : undefined,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = combineReducers({
  /* Authentication */
  userSignIn: LoginReducer,
  userSignUp: CandidateSignUpReducer,
  role: getAllRoleReducer,
  saveRole: saveRoleByAdminReducer,
  deleteRole: deleteRoleByAdminReducer,
  addRole: addRoleByAdminReducer,
  pageRole: pageRoleByAdminReducer,
  /* Candidate */
  candidates: getAllCandidateReducer,
  candidateSearch: getCandidateByNameReducer,
  getCandidateInfo: getCandidateInfoReducer,
  getCandidateUpdate: getCandidateUpdateReducer,
  uploadImage: uploadImageReducer,
  uploadCV: uploadCVReducer,

  /* Company */
  companyAll: getAllCompany,
  companySearch: getCompanyByNameReducer,
  companies: getAllCompanyByAdminReducer,
  getCompanyTop: getCompanyTopReducer,
  getDetailCompany: getDetailCompanyReducer,
  updateCompanyBasicInfo: updateCompanyBasicInfoReducer,
  updateCompanyDesc: updateCompanyDescReducer,
  updateCompanyMedia: updateCompanyMediaReducer,
  updateCompanyAddress: updateCompanyAddressReducer,
  uploadCompanyImage: uploadCompanyImageReducer,
  getCompanyById: getCompanyByIdReducer,

  /* Job */
  jobAll: getAllJob,
  jobAdmin: getAllJobByAdminReducer,
  jobCompany: getAllJobByCompanyReducer,
  jobSearch: getJobByNameReducer,
  createWork: createWorkReducer,
  getJobTop: getJobTopReducer,
  getJobById: getJobByIdReducer,
  getJobByStatus: getJobByStatusReducer,
  getCompanyManageJobById: getCompanyManageJobByIdReducer,

  /* Recruitment */
  applyJob: applyJobReducer,
  getRecruitmentCandidate: getRecruitmentCandidateReducer,
  getApplicationCandidateByJobAndStatus: getApplicationCandidateByJobAndStatusReducer,
  getApplicationIntervieweeByJobAndStatus: getApplicationIntervieweeByJobAndStatusReducer,
  getRecruitmentManageChangeStatus: getRecruitmentManageChangeStatusReducer,
  getRecruitmentManageAddInterview: getRecruitmentManageAddInterviewReducer,
  /* Category */
  getCategory: getCategoryReducer,
  getHotCategory: getHotCategoryReducer,

  /* Address */
  getProvince: getProvinceReducer,
  getDistrict: getDistrictReducer,
  getWards: getWardsReducer,

  /* Industry */
  getIndustry: getIndustryReducer,

  /* Notification */
  getNotification: getNotificationReducer,

  // System
  getStatisticalByAdmin: getStatisticalByAdminReducer,
  getStatisticalByCompany: getStatisticalByCompanyReducer,



  allProduct: getAllProductReducer,
  getProductById: getProductByIdReducer,
  searchProduct: searchProductReducer,
  cart: CartReducer,
  // allOrder: getAllOrderReducer,
  address: addressReducer,
  orderByUser: getOrderByUserReducer,
  orderInfo: OrderInfoReducer,
  payOrder: orderPayReducer,
  orderGhn: InfoGhnReducer,
  chat: ChatReducer,
  selectList: SelectListReducer,
  updateSelect: UpdateSelectListReducer,
  allTypeProduct: ListTypeProductReducer,
  detailType: TypeProductReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
