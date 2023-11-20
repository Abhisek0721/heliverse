import { FaMale, FaFemale, FaUser, FaUserSlash, FaEnvelope } from "react-icons/fa";

const UserCard = (props:any) => {

    const user = props?.user;

    return (
        <div className="w-64 sm:w-80 mt-5 mx-5 overflow-hidden rounded-lg shadow-md bg-gray-700">

            <div className="p-6">
                <div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <img className={`object-cover h-10 rounded-full border-4 ${(user?.available)?`border-green-500`:`border-red-400`}`} src={`${user?.avatar}`} alt="Avatar" />
                            <div className="mx-2 font-semibold text-gray-200" role="link">{user?.first_name} {user?.last_name}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <span className="text-xs font-medium uppercase text-blue-400">{user?.domain}</span>
                </div>

                <div className="">

                    <div className="flex items-center mt-4 text-gray-200">
                        {(user?.gender === "Male")?<FaMale />:<FaFemale />}

                        <h1 className="px-2 text-sm">{user?.gender}</h1>
                    </div>

                    <div className="flex items-center mt-4 text-gray-200">
                        {(user?.available)?<FaUser />:<FaUserSlash />}

                        <h1 className="px-2 text-sm">{(user?.available)?"Available":"Unavailable"}</h1>
                    </div>

                    <div className="flex items-center mt-4 text-gray-200">
                        <FaEnvelope />

                        <h1 className="px-2 text-sm">{user?.email}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;