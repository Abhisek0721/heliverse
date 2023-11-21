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

export const getAllTeams = async () => {
    try {
        const data = await axios.get(`${properties.SERVER_URL}/api/team`);
        return data.data;
    } catch (error:any) {
        return {
            status: false,
            error: error?.message
        }
    }
}

export const deleteTeamById = async (teamId:string) => {
    try {
        const data = await axios.delete(`${properties.SERVER_URL}/api/team/${teamId}`);
        return data.data;
    } catch (error:any) {
        return {
            status: false,
            error: error?.message
        }
    }
}

export const getTeamById = async (teamId:string) => {
    try {
        const data = await axios.get(`${properties.SERVER_URL}/api/team/${teamId}`);
        return data.data;
    } catch (error:any) {
        return {
            status: false,
            error: error?.message
        }
    }
}
