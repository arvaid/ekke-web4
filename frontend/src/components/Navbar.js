import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const activeClass = 'active';
    const normalClass = 'nav-link';

    return (
        <nav className='nav justify-content-center'>
            <NavLink to='/books' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Könyvek
            </NavLink>
            <NavLink to='/authors' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Szerzők
            </NavLink>
            <NavLink to='/readers' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Olvasók
            </NavLink>
        </nav>
    );
}

export default Navbar;