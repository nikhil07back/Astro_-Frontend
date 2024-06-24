
import apiInstance from './baseAPI';

export const updatePrice = async (data) => {
    try {
     console.log('data0000000',data)
     const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log("addAstroPrice",headers);

      const response = await apiInstance.put(`/updatePrice`,data,headers);
      return response;
    } catch (error) {
      return error;
    }
  };