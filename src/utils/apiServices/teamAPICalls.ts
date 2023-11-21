import axios from "axios";
import properties from "../../constants/properties";

export const createTeam = async (teamPayload:{
    teamName: string;
    userIds: string[];
}) => {
    try {
        if(!teamPayload.teamName || !teamPayload.userIds[0]){
            return {
                status: false,
                message: "Input are missing!"
            }
        }
        const data = await axios.post(`${properties.SERVER_URL}/api/team`, teamPayload);
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
            const data = '';
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
