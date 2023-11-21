import { Modal, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import properties from "../constants/properties";
import domainOptions from "../utils/common/domainOptions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import userDataAction from "../redux/actions/userDataAction";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupUserFilter = (props: any) => {
  const { openFilterModal, setOpenFilterModal } = props;
  const handleClose = () => setOpenFilterModal(false);
  const [filterQuery, setFilterQuery] = useState({
    gender: "",
    available: "",
    domain: ""
  });
  const dispatch = useDispatch();

  const filterSubmit = () => {
    axios
      .get(`${properties.SERVER_URL}/api/users/filter-users/0?domain=${filterQuery.domain}&gender=${filterQuery.gender}&available=${filterQuery.available}`)
      .then((res) => {
        if(res.data?.status){
          dispatch(userDataAction(res.data?.data));
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
        open={openFilterModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="bg-slate-900 w-[95%] h-[90%] lg:w-[900px] lg:h-[650px]"
        >
          
          <div>
            <IoCloseSharp
              onClick={() => handleClose()}
              className="text-3xl cursor-pointer text-white float-right"
            />
          </div>
          <div className="p-1 sm:p-4 text-white mt-5">
            <h1 className="text-center text-2xl sm:tex-3xl">User Filter</h1>
            <div className="flex flex-col my-10">
              {/* Gender */}
              <div
                onChange={(e) => {
                    filterQuery.gender = (e.target as HTMLInputElement).value;
                    setFilterQuery({...filterQuery});
                }}
                className="my-2 sm:w-[60%] sm:mx-auto text-xl text-slate-300"
              >
                <div className="mt-2">Gender</div>
                <div className="flex justify-evenly my-2">
                  <div>
                    <input
                      type="radio"
                      value="male"
                      id="male-gender"
                      name="gender"
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
                      value="female"
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
                      value="other"
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
                    filterQuery.available = (e.target as HTMLInputElement).value;
                    setFilterQuery({...filterQuery});
                }}
                className="my-2 sm:w-[60%] sm:mx-auto text-xl text-slate-300"
              >
                <div className="mt-2">Available</div>
                <div className="flex justify-evenly my-2">
                  <div>
                    <input
                      type="radio"
                      value="yes"
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

            {/* Domain */}
            <div className="my-2 sm:w-[60%] mx-auto text-xl text-slate-300">
                <div className="mt-2">Domain</div>
                <div className="flex justify-evenly my-2">
                  <select
                    onChange={(e) => {
                      filterQuery.domain = e.target.value;
                      setFilterQuery({...filterQuery});
                    }}
                    placeholder="Domain"
                    defaultValue={""}
                    className="w-[100%] mx-auto bg-slate-800 text-slate-300 outline-none py-2 px-4 text-xl my-2"
                  >
                    <option value={""}>
                        -- Select Domain --
                    </option>
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

              {/* Submit Button */}
              <div className="my-5 flex">
                <button
                  onClick={()=> filterSubmit()}
                  className="mx-auto sm:w-[30%] bg-slate-700 px-5 py-2 font-semibold rounded-md md:hover:bg-slate-600 active:bg-slate-900"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupUserFilter;
