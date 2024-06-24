import apiInstance from "../baseAPI";

export const editActivity = async (data) => {
  try {
    let config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };

    console.log("dataActivity1111", data);

    const response = await apiInstance.put(`/editActivity`, data, config);
    return response;
  } 
  catch (error) {
    return error;
  }
};
