import apiInstance from "./baseAPI";

export const getAllLanguage = async () => {
  try {
    console.log("ffffffffffffffffffffffff",apiInstance.headers);
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.get(`AllLanguage`,headers);
    return response;
  } catch (error) {
    return error;
  }
};
///////////////////Skills////////////////////////////

export const getAllSkill = async () => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.get(`all`,headers);
    return response;
  } catch (error) {
    return error;
  }
};

//'''''''''''''''''''''''''''''get all Astrologer api'''''''''''''''''''''''''''''''
export const getAllAstrologer = async () => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log("apiInstanceapiInstance",apiInstance);
    const response = await apiInstance.get(`allAstrologer `,headers);
    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};
/////////////////editAPI////////////////
export const editAstro = async (id, data) => {
  try {

    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    
    console.log("id", id, "data", data,"headersss",headers);
    const response = await apiInstance.put(`updateAstrologer/${id}`, data,headers);
    return response;
  } catch (error) {
    return error;
  }
};
//////////////////////////////////

export const editVisible = async (data, id) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log("data", data, "id", id);

    const response = await apiInstance.put(`/editVisibility`, data,headers);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteAstro = async (id) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.delete(`deleteAstrologer/${id}`,headers);
    return response;
  } catch (error) {
    return error;
  }
};
