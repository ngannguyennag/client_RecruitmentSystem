import axios from "axios";

export const getAllCompany = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/companies/all"
    );
    dispatch({ type: "GET_ALL_COMPANY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_COMPANY_FAIL", payload: error.message });
  }
};

export const getAllCompanyByAdmin = (page) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/companies/get-all",page,
    );
    dispatch({ type: "GET_ALL_COMPANY_BY_ADMIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_COMPANY_BY_ADMIN_FAIL", payload: error.message });
  }
};

export const getCompanyTop = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/companies/top?pageNo=0&pageSize=6&sortBy=companyId"
    );
    dispatch({ type: "GET_COMPANY_TOP_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_COMPANY_TOP_FAIL", payload: error.message });
  }
};

export const deleteCompany =
  (companyId, token) => async (dispatch, getState) => {
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/admin/manage/companies/delete/" +
        companyId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "DELETE_COMPANY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "DELETE_COMPANY_FAIL", payload: error.message });
    }
  };

export const getCompanyByName = (name, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/companies/find?name=" + name,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_COMPANY_BY_NAME_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_COMPANY_BY_NAME_FAIL", payload: error.message });
  }
};
export const getCompanyById = (companyId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/company/${companyId}`
    );
    dispatch({ type: "GET_COMPANY_BY_ID_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_COMPANY_BY_ID_FAIL", payload: error.message });
  }
}
export const getDetailCompany = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/company/manage/info",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    dispatch({ type: "GET_DETAIL_COMPANY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_DETAIL_COMPANY_FAIL", payload: error.message });
  }
};

export const getProvince = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/address/provinces"
    );
    const { data } = response;
    dispatch({ type: "GET_PROVINCE", payload: data });
  } catch (error) {
    dispatch({ type: "GET_PROVINCE_FAIL", payload: error.message });
  }
};

export const getDistrict = (codeProvince) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/address/districts/province?code=" +
      codeProvince
    );
    const { data } = response;
    dispatch({ type: "GET_DISTRICT", payload: data });
  } catch (error) {
    dispatch({ type: "GET_DISTRICT_FAIL", payload: error.message });
  }
};

export const getWards = (codeDistrict) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/address/wards/district?code=" + codeDistrict
    );
    const { data } = response;
    dispatch({ type: "GET_WARDS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_WARDS_FAIL", payload: error.message });
  }
};

export const getIndustry = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/industry/all"
    );
    const { data } = response;
    dispatch({ type: "GET_INDUSTRY", payload: data });
  } catch (error) {
    dispatch({ type: "GET_INDUSTRY_FAIL", payload: error.message });
  }
};

export const updateCompanyBasicInfo = (token, company) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/company/manage/update-basic-info",
      company,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "COMPANY_UPDATE_BASIC_INFO_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "COMPANY_UPDATE_BASIC_INFO_FAIL",
      payload: error.message,
    });
  }
};

export const updateCompanyDesc = (token, company) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/company/manage/update-desc",
      company,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "COMPANY_UPDATE_DESC_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "COMPANY_UPDATE_DESC_FAIL",
      payload: error.message,
    });
  }
};

export const updateCompanyMedia = (token, company) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/company/manage/update-media",
      company,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "COMPANY_UPDATE_MEDIA_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "COMPANY_UPDATE_MEDIA_FAIL",
      payload: error.message,
    });
  }
};

export const updateCompanyAddress = (token, company) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/company/manage/update-address",
      company,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "COMPANY_UPDATE_ADDRESS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "COMPANY_UPDATE_ADDRESS_FAIL", payload: error.message });
  }
};

export const uploadCompanyImage = (token, file, type) => async (dispatch) => {
  if (file.entries().next().value[1] !== null) {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/company/manage/${type}`,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "COMPANY_UPLOAD_IMAGE_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "COMPANY_UPLOAD_IMAGE_FAIL", payload: error.message });
    }
  }
};


// export const uploadCompanyLicense = (token, license) => async (dispatch) => {
//   if (license.entries().next().value[1] !== null) {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8080/api/v1/company/manage/license",
//         license,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       dispatch({ type: "COMPANY_UPLOAD_LICENSE_SUCCESS", payload: data });
//       return data;
//     } catch (error) {
//       dispatch({ type: "COMPANY_UPLOAD_LICENSE_FAIL", payload: error.message });
//     }
//   }
// };

// export const companyLogoUrl = (id) =>
//   "http://localhost:8080/api/v1/company/" + id + "/logo";

// export const companyLicenseUrl = (id, index) =>
//   `http://localhost:8080/api/v1/company/${id}/license/${index}`;

// export const companyImageUrl = (id) =>
//   "http://localhost:8080/api/v1/company/" + id + "/image";
