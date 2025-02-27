import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-700 text-white w-full md:max-w-lg h-12  mx-auto flex justify-evenly items-center md:my-8 md:rounded-md">
            <Link to="/" className="hover:text-amber-500">
                Home
            </Link>
            <Link to="/display" className="hover:text-amber-500">
                Display
            </Link>
            <Link to="/history" className="hover:text-amber-500">
                History
            </Link>
        </nav>
    );
}

export default Navbar;