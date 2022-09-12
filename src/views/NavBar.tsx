import { Link } from "react-router-dom";



function NavBar(){
    return (
        <nav className="navigation-bar">
            <Link to='/'>
                Home
            </Link>
            <Link to='my-stocks'>
                My Stocks
            </Link>
            <Link to='stock-list'>
                Stocks List
            </Link>

        </nav>
    )
}

export default NavBar;