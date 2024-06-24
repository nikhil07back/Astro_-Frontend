import apiInstance from "../baseAPI";

export const postGeneralSetting = async (data, settingId) => {
  console.log("I4ghhghh", settingId);

  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log(data);
    let response;

    if (settingId) {
      console.log("update");
      response = await apiInstance.put(
        `updateSetting/${settingId}`,
        data,
        headers
      );
    } else {
      console.log("add");
      response = await apiInstance.post(`addSetting`, data, headers);
    }

    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getGeneralSetting = async () => {
  try {
    const response = await apiInstance.get(`getSettings`);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error fetching general setting:", error);
    return error;
  }
};

//////////////custom field Api//////////////////

export const postCustomField = async (data) => {
  try {
    console.log("data-go", data);
    const response = await apiInstance.post(`customFieldUser`, data);
    console.log(data, "123456789");
    console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error fetching custom field:", error);
    return error;
  }
};

// export const postFieldConsultants = async (data) => {
//   try {
//     const response = await apiInstance.post(`customFieldConsultants`, data);
//     console.log(data , "123456789");
//     console.log("response", response);
//     return response;
//   } catch (error) {
//     console.error("Error fetching consultants:", error);
//     return error;
//   }
// }

// getUserCustomFieldById

export const getUserCustomField = async () => {
  try {
    const response = await apiInstance.get(`getUserCustomField`);
    // console.log("responsedsgerw", response);
    return response;
  } catch (error) {
    console.error("Error fetching general setting:", error);
    return error;
  }
};

export const deleteCustomField = async (id) => {
  try {
    const response = await apiInstance.delete(`deleteCustomField/${id}`)
    console.log("56264555555888888888",response);
    return response;
  } catch (error) {
    return error;
  }
};

