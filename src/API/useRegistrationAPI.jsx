import axios from "axios";
import apiInstance from "./baseAPI";

let bURL = "http://localhost:5000/astrology/";

export const postUserReg = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };

    console.log(data);
    const response = await apiInstance.post(`addRegistration`, data,headers);
    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async (userId) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log("localStorage", localStorage.getItem("accessToken"));

    const response = await apiInstance.get(`getUserById/${userId}`,headers);
    console.log("response", response);
    return response;
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};

export const editUser = async (id, data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log("id", id, "data", data);
    const response = await apiInstance.put(`updateUser/${id}`, data,headers);
    console.log("respons4444444444444444444e", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const postPayment = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log(data);
    const response = await apiInstance.post(`rechargeWallet`, data,headers);
    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const postVerifyPayment = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log(data);
    const response = await apiInstance.post(`verifyPayment`, data,headers);
    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};
