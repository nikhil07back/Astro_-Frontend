import apiInstance from "./baseAPI";

export const postAllLanguage = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.post(`addLanguage`, data,headers);
    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteLanguage = async (id) => {
  console.log("id12345", id);
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.delete(`deleteLanguage/${id}`,headers);
    return response;
  } catch (error) {
    return error;
  }
};



export const editLanguage = async (id,data) => {
  try{
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log('id',id,'data',data)
    const response = await apiInstance.put(`updateLanguage/${id}`,data,headers);
return response;
  }
  catch (error) {
    return error;
  }
}
