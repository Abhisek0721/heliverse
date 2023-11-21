import { searchUserByName } from "../utils/apiServices/userAPICalls";
import { FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import userDataAction from "../redux/actions/userDataAction";

const SearchBar = (props:any):JSX.Element => {

    const dispatch = useDispatch();

    const openFilter = () => {
        props?.setOpenFilterModal(!props?.openFilterModal);
    }

    const searchUser = async (username:string) => {
        const userData = await searchUserByName(username);
        if(userData?.status) {
            dispatch(userDataAction(userData.data));
        }
    }

    // Function to debounce search input
    function debounceSearch() {
        // Set a delay time (in milliseconds) for debouncing
        const debounceDelay = 1000; // 300ms delay before triggering the search
        let timeoutId:any;
        return (event:React.KeyboardEvent) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                searchUser((event.target as HTMLInputElement).value);
            }, debounceDelay);
        };
    }

    const processSearch = debounceSearch();

    return (
        <div className="mt-10 mx-10 sm:mx-80">
            <div className="flex justify-between">
                <input type="text" placeholder="Search" onKeyUp={(e:React.KeyboardEvent)=>processSearch(e)} className="w-[70%] sm:w-[90%] bg-slate-700 text-slate-300 outline-none py-2 px-4 text-xl" />
                <div onClick={() => openFilter()}
                 className="bg-slate-700 md:hover:bg-slate-600 active:bg-slate-900 px-3 py-2 sm:px-5 sm:py-4 rounded-sm cursor-pointer">
                    <FaFilter className="text-2xl" />
                </div>
                
            </div>
        </div>
    );
}

export default SearchBar;