import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { getTeamById } from "../utils/apiServices/teamAPICalls";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupTeamUsers = (props: any) => {
  const { openTeamUser, setOpenTeamUser } = props;
  const handleClose = () => setOpenTeamUser(false);
  const [usersOfTeam, setUsersOfTeam] = useState([]);

  useEffect(() => {
    const getTeam = async () => {
      const data = await getTeamById(props?.team?._id);
      if (data?.status) {
        setUsersOfTeam(data?.data?.userData);
        return;
      }
    }
    getTeam();
  }, []);

  return (
    <div>
      <Modal
        open={openTeamUser}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="bg-slate-900 w-[95%] h-[90%] lg:w-[900px] lg:h-[800px]"
        >

          <div>
            <IoCloseSharp
              onClick={() => handleClose()}
              className="text-3xl cursor-pointer text-white float-right"
            />
          </div>
          <div className="p-1 sm:p-4 text-white mt-5">
            <h1 className="text-center text-2xl sm:tex-3xl">{props?.team?.teamName}</h1>
            <div className="flex flex-col my-10">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>

                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-2">
                        <span>Domain</span>
                      </div>
                    </th>

                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-2">
                        <span>Gender</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 h-24">
                  {
                    usersOfTeam && usersOfTeam.map((user: any) => {
                      return (
                        <tr key={user?._id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <img className="object-cover w-10 h-10 rounded-full" src={user?.avatar} alt="" />
                                <div>
                                  <h2 className="font-medium text-gray-800 dark:text-white ">{user?.first_name} {user?.last_name}</h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              <h2 className="font-medium text-gray-800 dark:text-white ">{user?.domain}</h2>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                              <h2 className="font-medium text-gray-800 dark:text-white ">{user?.gender}</h2>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupTeamUsers;
