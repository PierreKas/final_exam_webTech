// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import PORT_NUMBER from '../../port_number';

// function SellingPointList() {
//     const [sellingPoints, setsellingPoints] = useState([]);
//     const [filteredsellingPoints, setFilteredsellingPoints] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [globalSearch, setGlobalSearch] = useState('');

//     // Use history hook for routing
//     const history = useHistory();

//     // Fetch selling points on component mount
//     useEffect(() => {
//         const fetchSellingPoints = async () => {
//             const url = `http://localhost:${PORT_NUMBER}/api/selling-point/all`;
//             try {
//                 setIsLoading(true);
//                 const response = await axios.get(url);
//                 setsellingPoints(response.data);
//                 setFilteredsellingPoints(response.data);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching selling points', error);
//                 setError('Failed to load selling points');
//                 setIsLoading(false);
//             }
//         };
//         fetchSellingPoints();
//     }, []);

//     // Handle global search input changes
//     const handleGlobalSearchChange = (value) => {
//         setGlobalSearch(value);

//         // Filter clients based on global search input
//         const filtered = sellingPoints.filter(sellingPoint =>
//             Object.values(sellingPoint).some(val =>
//                 String(val).toLowerCase().includes(value.toLowerCase())
//             )
//         );

//         sellingPoints(filtered);
//     };

//     // Handle navigation to AddSellingPoint page
//     const handleAddNewSellingPoint = () => {
//         history.push('/selling-point/add');
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
//                     placeholder="Search all selling points..."
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
//                     onClick={handleAddNewSellingPoint}
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
//                     Add New new Selling point
//                 </button>
//             </div>

//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f2f2f2' }}>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
//                         <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredsellingPoints.map((sp) => (
//                         <tr key={sp.sellingPointId} style={{ borderBottom: '1px solid #ddd' }}>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{sp.name}</td>
//                             <td style={{ border: '1px solid #ddd', padding: '8px' }}>{sp.address}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {filteredsellingPoints.length === 0 && (
//                 <div style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
//                     No selling point found matching your search
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SellingPointList;



// import React, { useState } from 'react'
// import Axios from 'axios';
// import Label from '../../components/label'
// import Button from '../../components/button';
// import PORT_NUMBER from '../../port_number';

// function AddSellingPoint() {
//     const url = `http://localhost:${PORT_NUMBER}/api/selling-point/add`;
//     const [data, setData] = useState({
//         name: "",
//         address: "",
//     });

//     function handleChange(e) {
//         const newData = { ...data };
//         newData[e.target.id] = e.target.value;
//         setData(newData);
//     }

//     function submitData(e) {
//         e.preventDefault();
//         Axios.post(url, {
//             name: data.name,
//             address: data.address
//         }).then(response => {
//             console.log('Selling point saved successfully', response);
//             alert('Selling point saved successfully');
//             setData({
//                 name: "",
//                 address: ""
//             });
//         })
//             .catch(error => {
//                 console.error('Error saving Selling point:', error);
//                 alert('Failed to save selling point. Please try again.');
//             });
//     }

//     return (
//         <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-10 bg-sky-50 p-12 rounded-2xl shadow-2xl border border-sky-200">
//                 <div className="text-center">
//                     <h2 className="text-3xl font-bold text-sky-700 tracking-tight">Create New Selling Point</h2>
//                     <p className="mt-2 text-sm text-sky-600">Enter details for a new selling point</p>
//                 </div>
//                 <form onSubmit={(e) => submitData(e)} className="space-y-6">
//                     <div>
//                         <Label text="Selling Point Name" className="block mb-2 text-sm font-medium text-sky-700" />
//                         <input
//                             onChange={(e) => handleChange(e)}
//                             id="name"
//                             value={data.name}
//                             placeholder='Enter selling point name'
//                             required
//                             className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
//                         />
//                     </div>
//                     <div>
//                         <Label text="Selling Point Address" className="block mb-2 text-sm font-medium text-sky-700" />
//                         <input
//                             onChange={(e) => handleChange(e)}
//                             id="address"
//                             value={data.address}
//                             placeholder='Enter selling point address'
//                             required
//                             className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
//                         />
//                     </div>
//                     <div>
//                         <Button
//                             label="Create Selling Point"
//                             className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default AddSellingPoint;


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PORT_NUMBER from '../../port_number';

function SellingPointList() {
    const [sellingPoints, setSellingPoints] = useState([]);
    const [filteredSellingPoints, setFilteredSellingPoints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalSearch, setGlobalSearch] = useState('');

    const history = useHistory();

    useEffect(() => {
        const fetchSellingPoints = async () => {
            const url = `http://localhost:${PORT_NUMBER}/api/selling-point/all`;
            try {
                setIsLoading(true);
                const response = await axios.get(url);
                setSellingPoints(response.data);
                setFilteredSellingPoints(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching selling points', error);
                setError('Failed to load selling points');
                setIsLoading(false);
            }
        };
        fetchSellingPoints();
    }, []);

    const handleGlobalSearchChange = (value) => {
        setGlobalSearch(value);
        const filtered = sellingPoints.filter(sellingPoint =>
            Object.values(sellingPoint).some(val =>
                String(val).toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredSellingPoints(filtered);
    };

    const handleAddNewSellingPoint = () => {
        history.push('/selling-point/add');
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
                    <h2 className="text-2xl font-bold">Selling Points</h2>
                    <button
                        onClick={handleAddNewSellingPoint}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Add New Selling Point
                    </button>
                </div>

                <div className="p-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search all selling points..."
                            value={globalSearch}
                            onChange={(e) => handleGlobalSearchChange(e.target.value)}
                            className="w-full px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-sky-100 border-b">
                                <tr className="bg-sky-50">
                                    {['Name', 'Address'].map(header => (
                                        <th key={header} className="p-3 text-left text-xs font-bold text-sky-800 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sky-200">
                                {filteredSellingPoints.map((sp) => (
                                    <tr key={sp.sellingPointId} className="hover:bg-sky-100 transition-colors duration-200">
                                        <td className="p-3 whitespace-nowrap">{sp.name}</td>
                                        <td className="p-3 whitespace-nowrap">{sp.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredSellingPoints.length === 0 && (
                            <div className="text-center mt-6 text-sky-700">
                                No selling points found matching your search
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellingPointList;