import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  getCandidateInfoReducer,
  getCandidateUpdateReducer,
  uploadCVReducer,
  uploadImageReducer,
  getAllCandidateReducer,
  getAllCandidateDashboardReducer,
  getCandidateByNameReducer,
  getAllCompanyByCandidateReducer,
} from "./reducers/CandidateReducer";
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
  getAllCategoryReducer,
  saveCategoryByAdminReducer,
  deleteCategoryByAdminReducer
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
  getAllJobByCandidateReducer,
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
  getRecruitmentReducer,
} from "./reducers/RecruitmentReducer";
import {
  CandidateSignUpReducer,
  LoginReducer,
  getAllRoleReducer,
  addRoleByAdminReducer,
  saveRoleByAdminReducer,
  deleteRoleByAdminReducer,
  pageRoleByAdminReducer,
} from "./reducers/AuthenticationReducer";
import {
  getAllSkillReducer,
  addSkillByAdminReducer,
  saveSkillByAdminReducer,
  deleteSkillByAdminReducer,
  pageSkillByAdminReducer,
  getSkillReducer,
} from "./reducers/SkillReducer";
import {
  getAllDegreeReducer,
  addDegreeByAdminReducer,
  saveDegreeByAdminReducer,
  deleteDegreeByAdminReducer,
  pageDegreeByAdminReducer,
  getDegreeReducer,
} from "./reducers/DegreeReducer";
import {
  getAllIndustryReducer,
  saveIndustryByAdminReducer,
  deleteIndustryByAdminReducer,
} from "./reducers/IndustryReducer";
import {
  getAllJobTypeReducer,
  saveJobTypeByAdminReducer,
  deleteJobTypeByAdminReducer,
  getJobTypeReducer,
} from "./reducers/JobTypeReducer";
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
  /* Skill */
  skill: getAllSkillReducer,
  saveSkill: saveSkillByAdminReducer,
  deleteSkill: deleteSkillByAdminReducer,
  addSkill: addSkillByAdminReducer, 
  pageSkill: pageSkillByAdminReducer,
  getSkill: getSkillReducer,
  /* Degree */
  degree: getAllDegreeReducer,
  saveDegree: saveDegreeByAdminReducer,
  deleteDegree: deleteDegreeByAdminReducer,
  addDegree: addDegreeByAdminReducer, 
  pageDegree: pageDegreeByAdminReducer,
  getDegree: getDegreeReducer,
  /* Industry */
  industry: getAllIndustryReducer,
  saveIndustry: saveIndustryByAdminReducer,
  deleteIndustry: deleteIndustryByAdminReducer,
  getIndustry: getIndustryReducer,
  /* JobType */
  jobType: getAllJobTypeReducer,
  saveJobType: saveJobTypeByAdminReducer,
  deleteJobType: deleteJobTypeByAdminReducer,
  getJobType: getJobTypeReducer,
  /* Candidate */
  candidates: getAllCandidateReducer,
  candidateDashboard: getAllCandidateDashboardReducer,
  candidateSearch: getCandidateByNameReducer,
  getCandidateInfo: getCandidateInfoReducer,
  getCandidateUpdate: getCandidateUpdateReducer,
  uploadImage: uploadImageReducer,
  uploadCV: uploadCVReducer,
  // getCandidate: getAllCandidateDashboardReducer,
  companyAllByCandidate: getAllCompanyByCandidateReducer,
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
  jobByAdmin: getAllJobByAdminReducer,
  jobByCandidate: getAllJobByCandidateReducer,
  jobByCompany: getAllJobByCompanyReducer,
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
  recruitmentAll: getRecruitmentReducer,
  /* Category */
  getCategory: getCategoryReducer,
  getHotCategory: getHotCategoryReducer,
  category: getAllCategoryReducer,
  saveCategory: saveCategoryByAdminReducer,
  deleteCategory: deleteCategoryByAdminReducer,
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

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
