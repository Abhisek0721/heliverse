import { Modal, Box } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import UserTable from "./UserTable";
import { useState } from "react";
import { createTeam } from "../utils/apiServices/teamAPICalls";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupCreateTeam = (props: any) => {
  const { openCreateTeamModal, setOpenCreateTeamModal } = props;
  const handleClose = () => setOpenCreateTeamModal(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [teamName, setTeamName] = useState("");

  const createTeamSubmit = async () => {
    const createTeamPayload = {
      teamName: teamName,
      userIds: selectedUserIds
    };
    const response = await createTeam(createTeamPayload);
    if(response?.status) {
      toast.success(response?.message);
      handleClose();
      return;
    }
    toast.error(response?.message);
  }

  return (
    <div>
      <Modal
        open={openCreateTeamModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="bg-slate-900 w-[95%] h-[100%] lg:h-[95%] lg:w-[900px]"
        >
          
          <div>
            <IoCloseSharp
              onClick={() => handleClose()}
              className="text-3xl cursor-pointer text-white float-right"
            />
          </div>
          <div className="p-1 sm:p-4 text-white mt-5">
            <h1 className="text-center text-2xl sm:tex-3xl">Create Team</h1>
            <div className="flex flex-col my-10">
              {/* Team Name */}
              <input
                type="text"
                onChange={(e)=> setTeamName(e.target.value)}
                className="sm:w-[60%] mx-auto bg-slate-800 text-slate-300 outline-none py-2 px-4 text-xl my-2"
                placeholder="Team Name"
                name="teamName"
                id="teamName"
                required
              />
              {/* Add Users To The Team */}
              <div
                className="my-2 sm:w-[60%] sm:mx-auto text-xl text-slate-300"
              >
                <div className="mt-5 text-center">Add Available Users</div>
                <div className="flex justify-evenly my-2">
                  <UserTable setSelectedUserIds={setSelectedUserIds} />
                </div>
              </div>
              {/* Submit Button */}
              <div className="my-5 flex">
                <button
                  onClick={()=> createTeamSubmit()}
                  className="mx-auto sm:w-[30%] bg-slate-700 px-5 py-2 font-semibold rounded-md md:hover:bg-slate-600 active:bg-slate-900"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupCreateTeam;
