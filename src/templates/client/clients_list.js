// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import PORT_NUMBER from '../../port_number';

// function ClientsList() {
//     const [clients, setClients] = useState([]);
//     const [filteredClients, setFilteredClients] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [globalSearch, setGlobalSearch] = useState('');

//     // Use history hook for routing
//     const history = useHistory();

//     // Fetch clients on component mount
//     useEffect(() => {
//         const fetchClients = async () => {
//             const url = `http://localhost:${PORT_NUMBER}/api/clients/all`;
//             try {
//                 setIsLoading(true);
//                 const response = await axios.get(url);
//                 setClients(response.data);
//                 setFilteredClients(response.data);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching clients', error);
//                 setError('Failed to load clients');
//                 setIsLoading(false);
//             }
//         };
//         fetchClients();
//     }, []);

//     // Handle global search input changes
//     const handleGlobalSearchChange = (value) => {
//         setGlobalSearch(value);

//         // Filter clients based on global search input
//         const filtered = clients.filter(client =>
//             Object.values(client).some(val =>
//                 String(val).toLowerCase().includes(value.toLowerCase())
//             )
//         );

//         setFilteredClients(filtered);
//     };

//     // Handle navigation to AddClient page
//     const handleAddNewClient = () => {
//         history.push('/client/add');
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

//                 {/* Add New Client Button */}
//                 <button
//                     onClick={handleAddNewClient}
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
//                     Add New Client
//                 </button>
//             </div>

//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f2f2f2' }}>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Full name</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone number</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Password</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredClients.map((client) => (
//                         <tr key={client.clientId} style={{ borderBottom: '1px solid #ddd' }}>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.fullName}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.phoneNumber}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.address}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.password}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {filteredClients.length === 0 && (
//                 <div style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
//                     No clients found matching your search
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ClientsList;


///////=================

// import React, { useState } from 'react';
// import Axios from 'axios';
// import Label from '../../components/label';
// import Button from '../../components/button';
// import PORT_NUMBER from '../../port_number';

// function AddClient() {
//     const url = `http://localhost:${PORT_NUMBER}/api/clients/add`;
//     const [data, setData] = useState({
//         fullName: "",
//         phoneNumber: "",
//         address: "",
//         password: ""
//     });

//     function handleChange(e) {
//         const { id, value } = e.target;
//         setData(prevData => ({
//             ...prevData,
//             [id]: value
//         }));
//     }

//     function submitData(e) {
//         e.preventDefault();
//         Axios.post(url, {
//             fullName: data.fullName,
//             phoneNumber: data.phoneNumber,
//             address: data.address,
//             password: data.password
//         }).then(response => {
//             console.log('Client saved successfully', response);
//             alert('Client saved successfully');
//             setData({
//                 fullName: "",
//                 phoneNumber: "",
//                 address: "",
//                 password: ""
//             });
//         })
//             .catch(error => {
//                 console.error('Error saving Client:', error);
//                 alert('Failed to save Client. Please try again.');
//             });
//     }

//     return (
//         <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
//             <div className="max-w-2xl w-full space-y-10 bg-sky-50 p-12 rounded-2xl shadow-2xl border border-sky-200">
//                 <div className="text-center">
//                     <h2 className="text-4xl font-bold text-sky-700 tracking-tight">Create New Client Profile</h2>
//                     <p className="mt-2 text-sm text-sky-600">Enter client details to add to the system</p>
//                 </div>

//                 <form onSubmit={(e) => submitData(e)} className="space-y-8">
//                     <div className="grid grid-cols-2 gap-6">
//                         <div>
//                             <Label text="Full Name" className="block mb-2 text-sm font-medium text-sky-700" />
//                             <input
//                                 onChange={(e) => handleChange(e)}
//                                 id="fullName"
//                                 value={data.fullName}
//                                 placeholder='Enter full name'
//                                 required
//                                 className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
//                             />
//                         </div>
//                         <div>
//                             <Label text="Phone Number" className="block mb-2 text-sm font-medium text-sky-700" />
//                             <input
//                                 onChange={(e) => handleChange(e)}
//                                 id="phoneNumber"
//                                 value={data.phoneNumber}
//                                 placeholder='Enter phone number'
//                                 type='tel'
//                                 required
//                                 className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <Label text="Password" className="block mb-2 text-sm font-medium text-sky-700" />
//                         <input
//                             onChange={(e) => handleChange(e)}
//                             id="password"
//                             type="password"
//                             value={data.password}
//                             placeholder='Create a secure password'
//                             required
//                             className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
//                         />
//                     </div>

//                     <div>
//                         <Label text="Address" className="block mb-2 text-sm font-medium text-sky-700" />
//                         <textarea
//                             onChange={(e) => handleChange(e)}
//                             id="address"
//                             value={data.address}
//                             placeholder='Enter full address'
//                             required
//                             className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
//                             rows={3}
//                         />
//                     </div>

//                     <div>
//                         <Button
//                             label="Add Client"
//                             className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddClient;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PORT_NUMBER from '../../port_number';

function ClientsList() {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalSearch, setGlobalSearch] = useState('');

    const history = useHistory();

    useEffect(() => {
        const fetchClients = async () => {
            const url = `http://localhost:${PORT_NUMBER}/api/clients/all`;
            try {
                setIsLoading(true);
                const response = await axios.get(url);
                setClients(response.data);
                setFilteredClients(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching clients', error);
                setError('Failed to load clients');
                setIsLoading(false);
            }
        };
        fetchClients();
    }, []);

    const handleGlobalSearchChange = (value) => {
        setGlobalSearch(value);
        const filtered = clients.filter(client =>
            Object.values(client).some(val =>
                String(val).toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredClients(filtered);
    };

    const handleAddNewClient = () => {
        history.push('/client/add');
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
                    <h2 className="text-2xl font-bold">Clients List</h2>
                    <button
                        onClick={handleAddNewClient}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Add New Client
                    </button>
                </div>

                <div className="p-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search all clients..."
                            value={globalSearch}
                            onChange={(e) => handleGlobalSearchChange(e.target.value)}
                            className="w-full px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-sky-100 border-b">
                                <tr>
                                    {['Full Name', 'Phone Number', 'Address', 'Password'].map(header => (
                                        <th key={header} className="p-3 text-left text-xs font-bold text-sky-800 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sky-200">
                                {filteredClients.map((client) => (
                                    <tr key={client.clientId} className="hover:bg-sky-100 transition-colors duration-200">
                                        <td className="p-3 whitespace-nowrap">{client.fullName}</td>
                                        <td className="p-3 whitespace-nowrap">{client.phoneNumber}</td>
                                        <td className="p-3 whitespace-nowrap">{client.address}</td>
                                        <td className="p-3 whitespace-nowrap">{'*'.repeat(client.password.length)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredClients.length === 0 && (
                            <div className="text-center mt-6 text-sky-700">
                                No clients found matching your search
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientsList;