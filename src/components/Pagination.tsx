import { getUserData } from "../utils/apiServices/userAPICalls";

const Pagination = (props:any) => {

    const totalUsers = props?.totalUsers;
    const totalPages = Math.round(totalUsers/20);
    const currentPage = props?.currentPage;

    const onPageClick = async (pageNumber:number) => {
        if(pageNumber<(totalPages-2) && pageNumber>=0){
            props?.setCurrentPage(pageNumber+1);
            const data = await getUserData(pageNumber*20);
            props?.setUserData(data.data);
        }
    }

    return (
        <div className="flex justify-center">
            <div onClick={()=> onPageClick(currentPage - 2)} className={`cursor-pointer flex items-center justify-center px-4 py-2 mx-1 text-white capitalize hover:bg-blue-500 hover:text-white bg-gray-600 rounded-md rtl:-scale-x-100`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>

            <div onClick={()=> onPageClick(currentPage)} className="cursor-pointer hidden px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-gray-600 rounded-md sm:inline hover:bg-blue-500 hover:text-white">
                {currentPage}
            </div>


            <div onClick={()=> onPageClick(currentPage + 1)} className="cursor-pointer hidden px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-gray-600 rounded-md sm:inline hover:bg-blue-500 hover:text-white">
                {currentPage + 1}
            </div>

            <div className="cursor-pointer hidden px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-gray-600 rounded-md sm:inline hover:bg-blue-500 hover:text-white">
                ...
            </div>

            <div className="cursor-pointer hidden px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-gray-600 rounded-md sm:inline hover:bg-blue-500 hover:text-white">
                {totalPages - 1}
            </div>

            <div className="cursor-pointer hidden px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-gray-600 rounded-md sm:inline hover:bg-blue-500 hover:text-white">
                {totalPages}
            </div>

            <div onClick={()=> onPageClick(currentPage + 1)} className="cursor-pointer flex items-center justify-center px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-gray-600 rounded-md rtl:-scale-x-100 hover:bg-blue-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}

export default Pagination;
