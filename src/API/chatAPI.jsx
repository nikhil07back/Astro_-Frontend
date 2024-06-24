import axios from "axios";
import apiInstance from "./baseAPI";



export const getAstrologerID = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await apiInstance.post(`postDetail`, data,headers);
    console.log("responseAstro", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const chatDetails = async (data) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log(data);
    const response = await apiInstance.post(`chatDetails`, data,headers);
    console.log("thisssisresponse", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserForAstrologer = async (data) => {
  try {
    const headers = {
      authorization: localStorage.getItem("accessToken"),
    };
    const response = await apiInstance.get(`getUserForAstrologer`, {
      params: data,
      headers: headers,
    });
    console.log("78", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllMessages = async (roomId) => {
  try {
    const headers = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    console.log('Hiii -hjj',roomId);
    const response = await apiInstance.get(`getAllMessages/${roomId}`,headers);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
