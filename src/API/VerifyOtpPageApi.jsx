import apiInstance from "./baseAPI";

export const VerifyOtpPage = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.post(`login`, data,headers);
    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};
