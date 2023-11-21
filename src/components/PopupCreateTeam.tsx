import { Modal, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import properties from "../constants/properties";
import { toast } from "react-toastify";
import UserTable from "./UserTable";



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
  const [addUser, setAddUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    domain: "Sales",
    avatar: "https://robohash.org/utquirepudiandae.png?size=50x50&set=set1",
    gender: "Male",
    available: "No",
  });

  const addUserSubmit = () => {
    axios
      .post(`${properties.SERVER_URL}/api/users/create-user`, addUser)
      .then((res) => {
        if(res.data?.status){
          console.log(res.data);
          toast.success(res.data?.message);
          handleClose();
          return;
        }
        toast.error(res.data?.message);
      })
      .catch((err) => {
        if(err?.response?.status === 400){
          toast.warn(err?.response?.data?.message);
          return;
        }
        toast.error(err?.response?.data?.message);
        console.log(err?.response?.data);
      });
  };

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
                onChange={(e) => {
                  addUser.first_name = e.target.value;
                  setAddUser({ ...addUser });
                }}
                type="text"
                className="sm:w-[60%] mx-auto bg-slate-800 text-slate-300 outline-none py-2 px-4 text-xl my-2"
                placeholder="Team Name"
                name="teamName"
                id="teamName"
                required
              />
              {/* Add Users To The Team */}
              <div
                onChange={(e) => {
                  addUser.available = (e.target as HTMLInputElement).value;
                  setAddUser({ ...addUser });
                }}
                className="my-2 sm:w-[60%] sm:mx-auto text-xl text-slate-300"
              >
                <div className="mt-5 text-center">Add Available Users</div>
                <div className="flex justify-evenly my-2">
                  <UserTable />
                </div>
              </div>
              {/* Submit Button */}
              <div className="my-5 flex">
                <button
                  onClick={()=> addUserSubmit()}
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
