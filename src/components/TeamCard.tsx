import { useState } from "react";
import PopupTeamUsers from "./PopupTeamUsers";
import { FaTrashAlt } from "react-icons/fa";
import { deleteTeamById } from "../utils/apiServices/teamAPICalls";
import { toast } from "react-toastify";

const TeamCard = (props:any) => {

    const [openTeamUser, setOpenTeamUser] = useState(false);
    const team = props?.team;

    const deleteTeam = async (teamId:string) => {
        const data = await deleteTeamById(teamId);
        if(data?.status){
            toast.success(data?.message);
            props?.setUserDeleted(!props?.userDeleted);
            return;
        }
        toast.error(data?.message);
    }

    return (
        <div className="w-64 sm:w-80 mt-5 mx-5 overflow-hidden rounded-lg shadow-md bg-gray-700">
            <PopupTeamUsers openTeamUser={openTeamUser} setOpenTeamUser={setOpenTeamUser} team={team} />
            <div className="float-right p-4">
                <FaTrashAlt onClick={()=> deleteTeam(team?._id)} className="text-xl cursor-pointer md:hover:text-red-500" />
            </div>
            <div className="p-6">
                <div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="mx-2 font-semibold text-gray-200" role="link">{team?.teamName}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 mx-2">
                    <span className="text-xs font-medium uppercase text-blue-400">{team?.createdAt}</span>
                </div>

                <div className="flex mt-10">
                    <button onClick={()=> setOpenTeamUser(!openTeamUser)} className="mx-auto bg-slate-800 px-5 py-2 font-semibold rounded-md md:hover:bg-slate-800 active:bg-slate-900">View Users</button>
                </div>
            </div>
        </div>
    )
}

export default TeamCard;