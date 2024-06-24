import apiInstance from "./baseAPI";

export const addAstroPrice = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.post(`addPrice`, data,headers);
    console.log("responseexp", response);
    return response;
  } catch (error) {
    return error;
  }
};
