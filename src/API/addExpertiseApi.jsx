
import apiInstance from './baseAPI';

export const postExcpertise = async (data) => {
  try{
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response =  await apiInstance.post(`add`,data,headers)
    console.log("responseexp",response);
    return response;
  }
  catch (error) {
    return error;
  }
}

/////////////////editAPI////////////////
export const editExpertise = async (id,data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
   console.log('id',id,'data',data)
    const response = await apiInstance.put(`update/${id}`,data,headers);
    return response;
  } catch (error) {
    return error;
  }
};

