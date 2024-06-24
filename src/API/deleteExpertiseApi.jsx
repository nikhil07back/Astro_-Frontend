import apiInstance from "./baseAPI";

export const deleteExpertise = async (id) => {
  console.log("id789",id)
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.delete(`delete/${id}`,headers);
    return response;
  } catch (error) {
    return error;
  }
};
