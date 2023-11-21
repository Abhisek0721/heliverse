import UserCard from "../components/UserCard";
import { useState, useEffect } from "react";
import { getUserData } from "../utils/apiServices/userAPICalls";
import Pagination from "../components/Pagination";
import PopupCreateTeam from "../components/PopupCreateTeam";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupUserFilter from "../components/PopupUserFilter";
import { useSelector, useDispatch } from 'react-redux';
import userDataAction from "../redux/actions/userDataAction";


const Team = () => {
    const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [totalUsers, setTotalUsers] = useState(1000);
    const [currentPage, setCurrentPage] = useState(1);
    const usersData = useSelector((state:any) => state.userDataReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData();
                setTotalUsers(data.totalUsers);
                dispatch(userDataAction(data?.data));
            } catch (error) {
                // Handle errors if needed
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Popup Toastify */}
            <ToastContainer />
            {/* Add User Modal */}
            <PopupCreateTeam openCreateTeamModal={openCreateTeamModal} setOpenCreateTeamModal={setOpenCreateTeamModal} />
            {/* Filter Modal */}
            <PopupUserFilter  openFilterModal={openFilterModal} setOpenFilterModal={setOpenFilterModal} />

            <div className="flex mt-16">
                <button onClick={()=> setOpenCreateTeamModal(!openCreateTeamModal)} className="mx-auto bg-slate-700 px-5 py-2 font-semibold rounded-md md:hover:bg-slate-600 active:bg-slate-900">Create Team</button>
            </div>
            
            <div>
                <div className="flex flex-wrap justify-evenly py-10 md:mx-48">
                {
                    usersData && usersData.map((user:any)=> {
                        return (
                            <div key={user?._id}>
                                <UserCard user={user} />
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