import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const activeClass = 'active';
    const normalClass = 'nav-link';

    return (
        <nav className='nav justify-content-center'>
            <NavLink to='/authors' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Szerzők
            </NavLink>
        </nav>
    );
}

export default Navbar;