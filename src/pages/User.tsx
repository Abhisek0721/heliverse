import UserCard from "../components/UserCard";
import { useState, useEffect } from "react";
import { getUserData } from "../utils/apiServices/userAPICalls";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const User = () => {
    const [userData, setUserData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(1000);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData();
                setTotalUsers(data.totalUsers);
                setUserData(data.data);
            } catch (error) {
                // Handle errors if needed
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <SearchBar setUserData={setUserData} />
            <div className="flex flex-wrap justify-evenly mt-5 md:mx-48">
                {
                    userData && userData.map((user:any)=> {
                        return (
                            <div key={user?._id}>
                                <UserCard user={user} />
                            </div>
                        )
                    })
                }
                <div className="mb-32 mt-10">
                    <Pagination totalUsers={totalUsers} currentPage={currentPage} setCurrentPage={setCurrentPage} setUserData={setUserData} />
                </div>
            </div>
        </div>
    )
}

export default User;