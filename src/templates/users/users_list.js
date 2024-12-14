// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import PORT_NUMBER from '../../port_number';

// function UsersList() {
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [globalSearch, setGlobalSearch] = useState('');

//     // Use history hook for routing
//     const history = useHistory();

//     // Fetch clients on component mount
//     // Fetch clients on component mount
//     const fetchUsers = async () => {
//         const url = `http://localhost:${PORT_NUMBER}/api/users/all`;
//         try {
//             setIsLoading(true);
//             const response = await axios.get(url);
//             setUsers(response.data);
//             setFilteredUsers(response.data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching users', error);
//             setError('Failed to load users');
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     // Handle global search input changes
//     const handleGlobalSearchChange = (value) => {
//         setGlobalSearch(value);

//         // Filter users based on global search input
//         const filtered = users.filter(user =>
//             Object.values(user).some(val =>
//                 String(val).toLowerCase().includes(value.toLowerCase())
//             )
//         );

//         setFilteredUsers(filtered);
//     };

//     // Handle navigation to AddUser page
//     const handleAddNewUser = () => {
//         history.push('/user/add');
//     };

//     // Update user status
//     // const updateUserStatus = async (userId, status) => {
//     //     try {
//     //         const url = `http://localhost:${PORT_NUMBER}/api/users/status/${userId}`;
//     //         await axios.put(url, status);

//     //         // Refresh the users list after successful update
//     //         // fetchUsers();
//     //     } catch (error) {
//     //         console.error('Error updating user status', error);
//     //         alert(`Failed to update user status: ${error.response?.data?.message || 'Unknown error'}`);
//     //     }
//     // };
//     const updateUserStatus = async (userId, status) => {
//         try {
//             const url = `http://localhost:${PORT_NUMBER}/api/users/status/${userId}`;
//             await axios.put(url, status, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             // Refresh the users list after successful update
//             fetchUsers();
//         } catch (error) {
//             console.error('Error updating user status', error);
//             alert(`Failed to update user status: ${error.response?.data?.message || 'Unknown error'}`);
//         }
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             {/* Container for search and add button */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '15px'
//             }}>
//                 {/* Global Search Input */}
//                 <input
//                     type="text"
//                     placeholder="Search all clients..."
//                     value={globalSearch}
//                     onChange={(e) => handleGlobalSearchChange(e.target.value)}
//                     style={{
//                         flex: 1,
//                         marginRight: '15px',
//                         padding: '10px',
//                         fontSize: '16px'
//                     }}
//                 />

//                 <button
//                     onClick={handleAddNewUser}
//                     style={{
//                         padding: '10px 15px',
//                         backgroundColor: '#4CAF50',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                         fontSize: '16px'
//                     }}
//                 >
//                     Add New User
//                 </button>
//             </div>

//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f2f2f2' }}>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Full name</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone number</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Selling Point</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>User status</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredUsers.map((user) => (
//                         <tr key={user.userId} style={{ borderBottom: '1px solid #ddd' }}>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.fullName}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.phoneNumber}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.role}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.sellingPoint.name}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userStatus}</td>
//                             <td style={{
//                                 border: '1px solid #ddd',
//                                 padding: '8px',
//                                 display: 'flex',
//                                 justifyContent: 'space-around'
//                             }}>
//                                 {user.userStatus !== 'APPROVED' && (
//                                     <button
//                                         onClick={() => updateUserStatus(user.userId, 'APPROVED')}
//                                         style={{
//                                             backgroundColor: '#4CAF50',
//                                             color: 'white',
//                                             border: 'none',
//                                             padding: '5px 10px',
//                                             borderRadius: '4px',
//                                             cursor: 'pointer',
//                                             marginRight: '5px'
//                                         }}
//                                     >
//                                         Approve
//                                     </button>
//                                 )}
//                                 {user.userStatus !== 'DENIED' && (
//                                     <button
//                                         onClick={() => updateUserStatus(user.userId, 'DENIED')}
//                                         style={{
//                                             backgroundColor: '#f44336',
//                                             color: 'white',
//                                             border: 'none',
//                                             padding: '5px 10px',
//                                             borderRadius: '4px',
//                                             cursor: 'pointer'
//                                         }}
//                                     >
//                                         Deny
//                                     </button>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {filteredUsers.length === 0 && (
//                 <div style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
//                     No user found matching your search
//                 </div>
//             )}
//         </div>
//     );
// }

// export default UsersList;


///////////////=========================


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PORT_NUMBER from '../../port_number';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalSearch, setGlobalSearch] = useState('');

    const history = useHistory();

    const fetchUsers = async () => {
        const url = `http://localhost:${PORT_NUMBER}/api/users/all`;
        try {
            setIsLoading(true);
            const response = await axios.get(url);
            setUsers(response.data);
            setFilteredUsers(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching users', error);
            setError('Failed to load users');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleGlobalSearchChange = (value) => {
        setGlobalSearch(value);

        const filtered = users.filter(user =>
            Object.values(user).some(val =>
                String(val).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilteredUsers(filtered);
    };

    const handleAddNewUser = () => {
        history.push('/user/add');
    };

    const updateUserStatus = async (userId, status) => {
        try {
            const url = `http://localhost:${PORT_NUMBER}/api/users/status/${userId}`;
            await axios.put(url, status, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            fetchUsers();
        } catch (error) {
            console.error('Error updating user status', error);
            alert(`Failed to update user status: ${error.response?.data?.message || 'Unknown error'}`);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen bg-sky-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            Error: {error}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 bg-sky-50 min-h-screen">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-sky-600 text-white p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Users Management</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search all users..."
                            value={globalSearch}
                            onChange={(e) => handleGlobalSearchChange(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 w-64"
                        />
                        <button
                            onClick={handleAddNewUser}
                            className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                        >
                            Add New User
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {filteredUsers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-sky-100 border-b">
                                    <tr>
                                        {['Full name', 'Phone number', 'Email', 'Role', 'Selling Point', 'User status', 'Actions'].map((header) => (
                                            <th
                                                key={header}
                                                className="p-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sky-200">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.userId} className="hover:bg-sky-100 transition-colors duration-200">
                                            <td className="p-3 whitespace-nowrap">{user.fullName}</td>
                                            <td className="p-3 whitespace-nowrap">{user.phoneNumber}</td>
                                            <td className="p-3 whitespace-nowrap">{user.email}</td>
                                            <td className="p-3 whitespace-nowrap">{user.role}</td>
                                            <td className="p-3 whitespace-nowrap">{user.sellingPoint.name}</td>
                                            <td className="p-3 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs ${user.userStatus === 'APPROVED' ? 'bg-green-200 text-green-800' :
                                                        user.userStatus === 'DENIED' ? 'bg-red-200 text-red-800' :
                                                            'bg-yellow-200 text-yellow-800'
                                                    }`}>
                                                    {user.userStatus}
                                                </span>
                                            </td>
                                            <td className="p-3 whitespace-nowrap space-x-2">
                                                {user.userStatus !== 'APPROVED' && (
                                                    <button
                                                        onClick={() => updateUserStatus(user.userId, 'APPROVED')}
                                                        className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {user.userStatus !== 'DENIED' && (
                                                    <button
                                                        onClick={() => updateUserStatus(user.userId, 'DENIED')}
                                                        className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                                                    >
                                                        Deny
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No users found matching your search
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UsersList;