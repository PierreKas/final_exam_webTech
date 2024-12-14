// import React from "react"
// import { Link } from "react-router-dom"

// function Navbar() {
//     return (
//         <nav className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
//             <div className="text-2xl font-bold">
//                 YEREMIYA PHARMACY
//             </div>
//             <div className="flex space-x-8">
//                 <Link to="/home" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
//                 <Link to="/product" className="hover:bg-blue-700 px-3 py-2 rounded">Product</Link>
//                 <Link to="/client" className="hover:bg-blue-700 px-3 py-2 rounded">Client</Link>
//                 <Link to="/selling-point" className="hover:bg-blue-700 px-3 py-2 rounded">Selling Point</Link>
//                 <Link to="/transaction" className="hover:bg-blue-700 px-3 py-2 rounded">Transactions</Link>
//                 <Link to="/user" className="hover:bg-blue-700 px-3 py-2 rounded">Users</Link>
//                 {/* <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Logout</Link> */}
//             </div>
//         </nav>
//     )
// }
// export default Navbar

import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
    const history = useHistory();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        // Clear user information from localStorage
        localStorage.removeItem('userInfo');
        // Redirect to login page
        history.push('/');
    };

    // If no user is logged in, don't render the navbar
    if (!userInfo) return null;

    // Define navigation items based on role
    const navItems = [
        { to: "/home", label: "Home", roles: ['ADMIN', 'MANAGER', 'USER'] },
        { to: "/client", label: "Clients", roles: ['ADMIN', 'MANAGER'] },
        { to: "/product", label: "Products", roles: ['ADMIN', 'MANAGER'] },
        { to: "/selling-point", label: "Selling Points", roles: ['ADMIN', 'MANAGER'] },
        { to: "/user", label: "Users", roles: ['ADMIN'] },
        { to: "/transaction", label: "Transactions", roles: ['ADMIN', 'MANAGER', 'USER'] },
        { to: "/dashboard", label: "Dashboard", roles: ['ADMIN', 'MANAGER'] }
    ];

    return (
        <nav className="w-full bg-sky-600 text-white shadow-md p-4 flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                YEREMIYA PHARMACY
            </div>

            <div className="flex space-x-4 items-center">
                {navItems
                    .filter(item => item.roles.includes(userInfo.role))
                    .map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="hover:bg-sky-700 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 ease-in-out"
                        >
                            {item.label}
                        </Link>
                    ))}

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;



// import React from 'react';
// import { Link, useHistory } from 'react-router-dom';

// function Navbar() {
//     const history = useHistory();
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//     const handleLogout = () => {
//         // Clear user information from localStorage
//         localStorage.removeItem('userInfo');
//         // Redirect to login page
//         history.push('/');
//     };

//     // If no user is logged in, don't render the navbar
//     if (!userInfo) return null;

//     return (
//         <nav>
//             <div>
//                 {/* Navigation links based on user role */}
//                 <Link to="/home">Home</Link>

//                 {/* Admin and Manager routes */}
//                 {(userInfo.role === 'ADMIN' || userInfo.role === 'MANAGER') && (
//                     <>
//                         <Link to="/client">Clients</Link>
//                         <Link to="/product">Products</Link>
//                         <Link to="/selling-point">Selling Points</Link>
//                     </>
//                 )}

//                 {/* Admin only routes */}
//                 {userInfo.role === 'ADMIN' && (
//                     <>
//                         <Link to="/user">Users</Link>
//                     </>
//                 )}

//                 {/* Transaction routes for all roles */}
//                 <Link to="/transaction">Transactions</Link>

//                 {/* Logout button */}
//                 <button onClick={handleLogout}>Logout</button>

//                 {/* Display user role and name */}
//                 <span>Welcome, {userInfo.fullName} ({userInfo.role})</span>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;