import apiInstance from "./baseAPI";

export const getAstroPrice = async () => {
  try {
    const header = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.get(`getPrices`,header);
    return response;
  } catch (error) {
    return error;
  }
};