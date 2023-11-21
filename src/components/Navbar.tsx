import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-[100%] px-20 py-5">
            <div className="justify-center text-2xl md:text-3xl underline list-none flex">
                
                <li className="mr-10 cursor-pointer">
                    <Link to="/">
                        Users
                    </Link>
                </li>
                
                
                <li className="ml-10 cursor-pointer">
                    <Link to={"/teams"}>
                        Teams
                    </Link>
                </li>
              
            </div>
        </nav>
    )
}

export default Navbar;