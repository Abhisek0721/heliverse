import { searchUserByName } from "../utils/apiServices/userAPICalls";

const SearchBar = (props:any):JSX.Element => {

    const searchUser = async (username:string) => {
        const userData = await searchUserByName(username);
        if(userData?.status) {
            props?.setUserData(userData.data);
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
        <div>
            <div className="flex">
                <input type="text" placeholder="Search" onKeyUp={(e:React.KeyboardEvent)=>processSearch(e)} className="mx-auto w-[75%] bg-slate-600 text-slate-300 mt-10 outline-none py-2 px-4 text-xl" />
                {/* <button onClick={()=>getMusicList()} className="btn-dark mx-auto">Suffle</button> */}
            </div>
        </div>
    );
}

export default SearchBar;