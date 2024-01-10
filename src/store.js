import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  getAccountInfoReducer,
  getAccountUpdateReducer,
  getAllUserReducer,
  getUserByNameReducer,
  uploadCVReducer,
  uploadImageReducer,
  UserSigninReducer,
  UserSignupReducer,
  getRecruitmentCandidateReducer
} from "./reducers/UserReducer";
import {
  getAllProductReducer,
  getProductByIdReducer,
  paginationProductReducer,
  ascendingProductReducer,
  descendingProductReducer,
  searchProductReducer,
  reviewProductReducer,
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
} from "./reducers/JobReducer";
import {
  updateCompanyBasicInfoReducer,
  updateCompanyAddressReducer,
  uploadCompanyImageReducer,
  updateCompanyDescReducer,
  updateCompanyMediaReducer,
} from "./reducers/CompanyReducer";
import { applyJobReducer } from "./reducers/RecruitmentReducer";

const initialState = {
  userSignin: {
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
  users: getAllUserReducer,
  userSignin: UserSigninReducer,
  userSignup: UserSignupReducer,
  userSearch: getUserByNameReducer,
  getAccountInfo: getAccountInfoReducer,
  getAccountUpdate: getAccountUpdateReducer,
  uploadImage: uploadImageReducer,
  uploadCV: uploadCVReducer,
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
  jobAll: getAllJob,
  jobAdmin: getAllJobByAdminReducer,
  jobCompany: getAllJobByCompanyReducer,
  jobSearch: getJobByNameReducer,
  createWork: createWorkReducer,
  getJobTop: getJobTopReducer,
  getJobById: getJobByIdReducer,
  applyJob: applyJobReducer,
  getCategory: getCategoryReducer,
  getHotCategory: getHotCategoryReducer,
  allProduct: getAllProductReducer,
  getProductById: getProductByIdReducer,
  getProvince: getProvinceReducer,
  getDistrict: getDistrictReducer,
  getWards: getWardsReducer,
  getIndustry: getIndustryReducer,
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
  getRecruimentCandidate: getRecruitmentCandidateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
