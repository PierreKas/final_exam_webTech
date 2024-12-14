// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import PORT_NUMBER from '../../port_number';

// function TransactionList() {
//     const [transactions, setTransactions] = useState([]);
//     const [sellingPoints, setSellingPoints] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedSellingPointId, setSelectedSellingPointId] = useState('');

//     // Use history hook for routing
//     const history = useHistory();

//     // Fetch all transactions and selling points on component mount
//     useEffect(() => {
//         const fetchInitialData = async () => {
//             try {
//                 setIsLoading(true);
//                 // Fetch all transactions
//                 const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
//                 setTransactions(transactionsResponse.data);

//                 // Fetch selling points
//                 const sellingPointsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`);
//                 setSellingPoints(sellingPointsResponse.data);

//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching initial data', error);
//                 setError('Failed to load transactions or selling points');
//                 setIsLoading(false);
//             }
//         };
//         fetchInitialData();
//     }, []);

//     // Fetch transactions by date
//     const fetchTransactionsByDate = async () => {
//         if (!selectedDate) {
//             // If no date selected, show all transactions
//             const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
//             setTransactions(transactionsResponse.data);
//             return;
//         }

//         const url = `http://localhost:${PORT_NUMBER}/api/transactions/by-date?date=${selectedDate}`;
//         try {
//             setIsLoading(true);
//             const response = await axios.get(url);
//             setTransactions(response.data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching transactions by date', error);
//             setError('Failed to load transactions');
//             setIsLoading(false);
//         }
//     };

//     // Fetch transactions by selling point
//     const fetchTransactionsBySellingPoint = async () => {
//         if (!selectedSellingPointId) {
//             // If no selling point selected, show all transactions
//             const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
//             setTransactions(transactionsResponse.data);
//             return;
//         }

//         const url = `http://localhost:${PORT_NUMBER}/api/transactions/by-selling-point/${selectedSellingPointId}`;
//         try {
//             setIsLoading(true);
//             const response = await axios.get(url);
//             setTransactions(response.data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching transactions by selling point', error);
//             setError('Failed to load transactions');
//             setIsLoading(false);
//         }
//     };

//     // Handle date change to ensure only date is captured
//     const handleDateChange = (e) => {
//         const inputDate = e.target.value;
//         setSelectedDate(inputDate);
//     };

//     // Trigger fetches when filters change
//     useEffect(() => {
//         fetchTransactionsByDate();
//     }, [selectedDate]);

//     useEffect(() => {
//         fetchTransactionsBySellingPoint();
//     }, [selectedSellingPointId]);

//     // Handle navigation to AddTransaction page
//     const handleAddNewTransaction = () => {
//         history.push('/transaction/add');
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             {/* Container for filtering and add button */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '15px'
//             }}>
//                 {/* Date Filter */}
//                 <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
//                     <input
//                         type="date"
//                         value={selectedDate}
//                         onChange={handleDateChange}
//                         style={{
//                             marginRight: '10px',
//                             padding: '10px',
//                             fontSize: '16px'
//                         }}
//                     />
//                 </div>

//                 {/* Selling Point Filter */}
//                 <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
//                     <select
//                         value={selectedSellingPointId}
//                         onChange={(e) => setSelectedSellingPointId(e.target.value)}
//                         style={{
//                             marginRight: '10px',
//                             padding: '10px',
//                             fontSize: '16px',
//                             width: '200px'
//                         }}
//                     >
//                         <option value="">All Selling Points</option>
//                         {sellingPoints.map(point => (
//                             <option
//                                 key={point.sellingPointId}
//                                 value={point.sellingPointId}
//                             >
//                                 {point.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Add New Transaction Button */}
//                 <button
//                     onClick={handleAddNewTransaction}
//                     style={{
//                         padding: '10px 15px',
//                         backgroundColor: '#FF9800',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                         fontSize: '16px'
//                     }}
//                 >
//                     Add New Transaction
//                 </button>
//             </div>

//             {transactions.length > 0 ? (
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr style={{ backgroundColor: '#f2f2f2' }}>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product name</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unit price</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total price</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Client</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction date</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Selling Point</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {transactions.map((tr) => (
//                             <tr key={tr.transactionId} style={{ borderBottom: '1px solid #ddd' }}>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tr.product.productName}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tr.product.sellingPrice}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tr.quantity}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tr.totalPrice}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tr.client.fullName}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tr.sellingDate}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tr.sellingPoint.name}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <div style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
//                     No transactions found
//                 </div>
//             )}
//         </div>
//     );
// }

// export default TransactionList;


/////////================


// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import PORT_NUMBER from '../../port_number';

// function TransactionList() {
//     const [transactions, setTransactions] = useState([]);
//     const [sellingPoints, setSellingPoints] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedSellingPointId, setSelectedSellingPointId] = useState('');

//     const history = useHistory();

//     useEffect(() => {
//         const fetchInitialData = async () => {
//             try {
//                 setIsLoading(true);
//                 const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
//                 setTransactions(transactionsResponse.data);

//                 const sellingPointsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`);
//                 setSellingPoints(sellingPointsResponse.data);

//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching initial data', error);
//                 setError('Failed to load transactions or selling points');
//                 setIsLoading(false);
//             }
//         };
//         fetchInitialData();
//     }, []);

//     const fetchTransactionsByDate = async () => {
//         if (!selectedDate) {
//             const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
//             setTransactions(transactionsResponse.data);
//             return;
//         }

//         const url = `http://localhost:${PORT_NUMBER}/api/transactions/by-date?date=${selectedDate}`;
//         try {
//             setIsLoading(true);
//             const response = await axios.get(url);
//             setTransactions(response.data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching transactions by date', error);
//             setError('Failed to load transactions');
//             setIsLoading(false);
//         }
//     };

//     const fetchTransactionsBySellingPoint = async () => {
//         if (!selectedSellingPointId) {
//             const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
//             setTransactions(transactionsResponse.data);
//             return;
//         }

//         const url = `http://localhost:${PORT_NUMBER}/api/transactions/by-selling-point/${selectedSellingPointId}`;
//         try {
//             setIsLoading(true);
//             const response = await axios.get(url);
//             setTransactions(response.data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching transactions by selling point', error);
//             setError('Failed to load transactions');
//             setIsLoading(false);
//         }
//     };

//     const handleDateChange = (e) => {
//         const inputDate = e.target.value;
//         setSelectedDate(inputDate);
//     };

//     useEffect(() => {
//         fetchTransactionsByDate();
//     }, [selectedDate]);

//     useEffect(() => {
//         fetchTransactionsBySellingPoint();
//     }, [selectedSellingPointId]);

//     const handleAddNewTransaction = () => {
//         history.push('/transaction/add');
//     };

//     if (isLoading) return (
//         <div className="flex justify-center items-center h-screen bg-sky-50">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
//         </div>
//     );

//     if (error) return (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             Error: {error}
//         </div>
//     );

//     return (
//         <div className="container mx-auto px-4 py-8 bg-sky-50 min-h-screen">
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <div className="bg-sky-600 text-white p-4 flex justify-between items-center">
//                     <h2 className="text-2xl font-bold">Transactions</h2>
//                     <div className="flex items-center space-x-4">
//                         <input
//                             type="date"
//                             value={selectedDate}
//                             onChange={handleDateChange}
//                             className="px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-sky-600"
//                         />

//                         <select
//                             value={selectedSellingPointId}
//                             onChange={(e) => setSelectedSellingPointId(e.target.value)}
//                             className="px-3 py-2 border text-gray rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 w-48 hover:bg-sky-600"
//                         >
//                             <option value="">All Selling Points</option>
//                             {sellingPoints.map(point => (
//                                 <option
//                                     key={point.sellingPointId}
//                                     value={point.sellingPointId}
//                                 >
//                                     {point.name}
//                                 </option>
//                             ))}
//                         </select>

//                         <button
//                             onClick={handleAddNewTransaction}
//                             className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
//                         >
//                             Add New Transaction
//                         </button>
//                     </div>
//                 </div>

//                 <div className="p-4">
//                     {transactions.length > 0 ? (
//                         <div className="overflow-x-auto">
//                             <table className="w-full">
//                                 <thead className="bg-sky-100 border-b">
//                                     <tr>
//                                         {['Product name', 'Unit price', 'Quantity', 'Total price', 'Client', 'Transaction date', 'Selling Point'].map((header) => (
//                                             <th
//                                                 key={header}
//                                                 className="p-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider"
//                                             >
//                                                 {header}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-sky-200">
//                                     {transactions.map((tr) => (
//                                         <tr key={tr.transactionId} className="hover:bg-sky-100 transition-colors duration-200">
//                                             <td className="p-3 whitespace-nowrap">{tr.product.productName}</td>
//                                             <td className="p-3 whitespace-nowrap text-green-600">${tr.product.sellingPrice}</td>
//                                             <td className="p-3 whitespace-nowrap">{tr.quantity}</td>
//                                             <td className="p-3 whitespace-nowrap text-blue-600">${tr.totalPrice}</td>
//                                             <td className="p-3 whitespace-nowrap">{tr.client.fullName}</td>
//                                             <td className="p-3 whitespace-nowrap">{tr.sellingDate}</td>
//                                             <td className="p-3 whitespace-nowrap">{tr.sellingPoint.name}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         <div className="text-center py-8 text-gray-500">
//                             No transactions found
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TransactionList;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PORT_NUMBER from '../../port_number';

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [sellingPoints, setSellingPoints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSellingPointId, setSelectedSellingPointId] = useState('');

    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const rowsPerPage = 10; // Number of rows per page

    const history = useHistory();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
                setTransactions(transactionsResponse.data);

                const sellingPointsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`);
                setSellingPoints(sellingPointsResponse.data);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching initial data', error);
                setError('Failed to load transactions or selling points');
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const fetchTransactionsByDate = async () => {
        if (!selectedDate) {
            const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
            setTransactions(transactionsResponse.data);
            return;
        }

        const url = `http://localhost:${PORT_NUMBER}/api/transactions/by-date?date=${selectedDate}`;
        try {
            setIsLoading(true);
            const response = await axios.get(url);
            setTransactions(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching transactions by date', error);
            setError('Failed to load transactions');
            setIsLoading(false);
        }
    };

    const fetchTransactionsBySellingPoint = async () => {
        if (!selectedSellingPointId) {
            const transactionsResponse = await axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`);
            setTransactions(transactionsResponse.data);
            return;
        }

        const url = `http://localhost:${PORT_NUMBER}/api/transactions/by-selling-point/${selectedSellingPointId}`;
        try {
            setIsLoading(true);
            const response = await axios.get(url);
            setTransactions(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching transactions by selling point', error);
            setError('Failed to load transactions');
            setIsLoading(false);
        }
    };

    const handleDateChange = (e) => {
        const inputDate = e.target.value;
        setSelectedDate(inputDate);
    };

    useEffect(() => {
        fetchTransactionsByDate();
    }, [selectedDate]);

    useEffect(() => {
        fetchTransactionsBySellingPoint();
    }, [selectedSellingPointId]);

    const handleAddNewTransaction = () => {
        history.push('/transaction/add');
    };

    // Pagination logic
    const totalPages = Math.ceil(transactions.length / rowsPerPage);
    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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
                    <h2 className="text-2xl font-bold">Transactions</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-sky-600"
                        />

                        <select
                            value={selectedSellingPointId}
                            onChange={(e) => setSelectedSellingPointId(e.target.value)}
                            className="px-3 py-2 border text-gray rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 w-48 hover:bg-sky-600"
                        >
                            <option value="">All Selling Points</option>
                            {sellingPoints.map(point => (
                                <option
                                    key={point.sellingPointId}
                                    value={point.sellingPointId}
                                >
                                    {point.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleAddNewTransaction}
                            className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                        >
                            Add New Transaction
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {paginatedTransactions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-sky-100 border-b">
                                    <tr>
                                        {['Product name', 'Unit price', 'Quantity', 'Total price', 'Client', 'Transaction date', 'Selling Point'].map((header) => (
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
                                    {paginatedTransactions.map((tr) => (
                                        <tr key={tr.transactionId} className="hover:bg-sky-100 transition-colors duration-200">
                                            <td className="p-3 whitespace-nowrap">{tr.product.productName}</td>
                                            <td className="p-3 whitespace-nowrap text-green-600">${tr.product.sellingPrice}</td>
                                            <td className="p-3 whitespace-nowrap">{tr.quantity}</td>
                                            <td className="p-3 whitespace-nowrap text-blue-600">${tr.totalPrice}</td>
                                            <td className="p-3 whitespace-nowrap">{tr.client.fullName}</td>
                                            <td className="p-3 whitespace-nowrap">{tr.sellingDate}</td>
                                            <td className="p-3 whitespace-nowrap">{tr.sellingPoint.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No transactions found
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600'}`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 mx-1">{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransactionList;
