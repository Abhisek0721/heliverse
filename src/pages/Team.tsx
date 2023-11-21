import TeamCard from "../components/TeamCard";
import { useState, useEffect } from "react";
import { getAllTeams } from "../utils/apiServices/teamAPICalls";
import PopupCreateTeam from "../components/PopupCreateTeam";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Team = () => {
    const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [userDeleted, setUserDeleted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllTeams();
                if(data?.status){
                    setTeamData(data?.data);
                }
            } catch (error) {
                // Handle errors if needed
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [openCreateTeamModal, userDeleted]);

    return (
        <div>
            {/* Popup Toastify */}
            <ToastContainer />
            {/* Create Team Modal */}
            <PopupCreateTeam openCreateTeamModal={openCreateTeamModal} setOpenCreateTeamModal={setOpenCreateTeamModal} />
            <div className="flex mt-16">
                <button 
                    onClick={()=> setOpenCreateTeamModal(!openCreateTeamModal)} 
                    className="mx-auto bg-slate-700 px-5 py-2 
                        font-semibold rounded-md md:hover:bg-slate-600 active:bg-slate-900"
                >
                        Create Team
                </button>
            </div>
            
            <div>
                <div className="flex flex-wrap justify-evenly py-10 md:mx-48">
                {
                    teamData && teamData.map((team:any)=> {
                        return (
                            <div key={team?._id}>
                                <TeamCard team={team} setUserDeleted={setUserDeleted} userDeleted={userDeleted} />
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Team;