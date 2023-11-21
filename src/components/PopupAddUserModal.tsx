import { Modal, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import properties from "../constants/properties";
import domainOptions from "../utils/common/domainOptions";
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

const PopupModal = (props: any) => {
  const { openAddUserModal, setOpenAddUserModal } = props;
  const handleClose = () => setOpenAddUserModal(false);
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
        open={openAddUserModal}
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
            <h1 className="text-center text-2xl sm:tex-3xl">Add New User</h1>
            <div className="flex flex-col my-10">
              {/* First Name */}
              <input
                onChange={(e) => {
                  addUser.first_name = e.target.value;
                  setAddUser({ ...addUser });
                }}
                type="text"
                className="sm:w-[60%] mx-auto bg-slate-800 text-slate-300 outline-none py-2 px-4 text-xl my-2"
                placeholder="First Name"
                name="first_name"
                id="first_name"
                required
              />
              {/* Last Name */}
              <input
                type="text"
                onChange={(e) => {
                  addUser.last_name = e.target.value;
                  setAddUser({ ...addUser });
                }}
                className="sm:w-[60%] mx-auto bg-slate-800 text-slate-300 outline-none py-2 px-4 text-xl my-2"
                placeholder="Last Name"
                name="last_name"
                id="last_name"
                required
              />
              {/* Email */}
              <input
                type="email"
                onChange={(e) => {
                  addUser.email = e.target.value;
                  setAddUser({ ...addUser });
                }}
                className="sm:w-[60%] mx-auto bg-slate-800 text-slate-300 outline-none py-2 px-4 text-xl my-2"
                placeholder="Email"
                name="email"
                id="email"
                required
              />
              {/* Domain */}
              <div className="my-2 sm:w-[60%] mx-auto text-xl text-slate-300">
                <div className="mt-2">Domain</div>
                <div className="flex justify-evenly my-2">
                  <select
                    onChange={(e) => {
                      addUser.domain = e.target.value;
                      setAddUser({ ...addUser });
                    }}
                    placeholder="Domain"
                    className="w-[100%] mx-auto bg-slate-800 text-slate-300 outline-none py-2 px-4 text-xl my-2"
                  >
                    {
                        domainOptions.map((domainName) => {
                            return (
                                <option value={domainName} key={domainName} >
                                    {domainName}
                                </option>
                            );
                        })
                    }
                  </select>
                </div>
              </div>
              {/* Gender */}
              <div
                onChange={(e) => {
                  addUser.gender = (e.target as HTMLInputElement).value;
                  setAddUser({ ...addUser });
                }}
                className="my-2 sm:w-[60%] sm:mx-auto text-xl text-slate-300"
              >
                <div className="mt-2">Gender</div>
                <div className="flex justify-evenly my-2">
                  <div>
                    <input
                      type="radio"
                      value="Male"
                      id="male-gender"
                      name="gender"
                      defaultChecked
                    />
                    <label
                      htmlFor="male-gender"
                      className="ml-1 cursor-pointer text-sm sm:text-xl"
                    >
                      Male
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="Female"
                      id="female-gender"
                      name="gender"
                    />
                    <label
                      htmlFor="female-gender"
                      className="ml-1 cursor-pointer text-sm sm:text-xl"
                    >
                      Female
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="Other"
                      id="other-gender"
                      name="gender"
                    />
                    <label
                      htmlFor="other-gender"
                      className="ml-1 cursor-pointer text-sm sm:text-xl"
                    >
                      Other
                    </label>
                  </div>
                </div>
              </div>
              {/* Available */}
              <div
                onChange={(e) => {
                  addUser.available = (e.target as HTMLInputElement).value;
                  setAddUser({ ...addUser });
                }}
                className="my-2 sm:w-[60%] sm:mx-auto text-xl text-slate-300"
              >
                <div className="mt-2">Available</div>
                <div className="flex justify-evenly my-2">
                  <div>
                    <input
                      type="radio"
                      value="Yes"
                      id="available-yes"
                      name="available"
                    />
                    <label
                      htmlFor="available-yes"
                      className="ml-1 cursor-pointer text-sm sm:text-xl"
                    >
                      Yes
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="no"
                      id="available-no"
                      name="available"
                      defaultChecked
                    />
                    <label
                      htmlFor="available-no"
                      className="ml-1 cursor-pointer text-sm sm:text-xl"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="my-5 flex">
                <button
                  onClick={()=> addUserSubmit()}
                  className="mx-auto sm:w-[30%] bg-slate-700 px-5 py-2 font-semibold rounded-md md:hover:bg-slate-600 active:bg-slate-900"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupModal;
