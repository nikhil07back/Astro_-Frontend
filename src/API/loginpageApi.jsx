import apiInstance from './baseAPI'

export const loginPageApi = async (data) => {

    try{
        const response = await apiInstance.post(`login`,data);
        if(response.status === 200){
            localStorage.setItem("accessToken",response.data?.accessToken);
        }
        return response;

    }
    catch(error) {
        return error;
    }
}