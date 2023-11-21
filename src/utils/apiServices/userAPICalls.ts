import axios from "axios";
import properties from "../../constants/properties";

export const getUserData = async (skipFrom=0) => {
    try {
        const data = await axios.get(`${properties.SERVER_URL}/api/users?skipFrom=${skipFrom}`);
        return data.data;
    } catch (error:any) {
        return {
            status: false,
            error: error?.message
        }
    }
}

export const searchUserByName = async (username:string) => {
    try {
        if(!username) {
            const data = await getUserData();
            return data;
        }
        const data = await axios.get(`${properties.SERVER_URL}/api/users/search-user/${username}`);
        return data.data;
    } catch (error:any) {
        return {
            status: false,
            error: error?.message
        }
    }
}


export const deleteUserById = async (userId:string) => {
    try {
        const data = await axios.delete(`${properties.SERVER_URL}/api/users/${userId}`);
        return data.data;
    } catch (error:any) {
        return {
            status: false,
            error: error?.message
        }
    }
}
