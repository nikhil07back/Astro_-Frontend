import apiInstance from './baseAPI';

export const postaddAstrologer = async (data) => {
    try {
        const headers = {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          };
        console.log(data);
        const response = await apiInstance.post(`addAstrologer`, data ,headers);  
        console.log("response", response);
        return response;
    } 
    catch (error) {
        return error;
    }
};





