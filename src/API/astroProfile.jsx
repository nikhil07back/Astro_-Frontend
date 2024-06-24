import apiInstance from "./baseAPI";

export const getDynamic = async (userId) => {
    try {
        const headers = {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          };
        const response = await apiInstance.get(`astrologers/${userId}`,headers);
        console.log("response", response);
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
};
