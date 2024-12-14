// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PORT_NUMBER from '../../port_number';
// import { useHistory } from 'react-router-dom';

// function ProductList() {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [globalSearch, setGlobalSearch] = useState('');

//     // Use history hook for routing
//     const history = useHistory();
//     const [searchFilters, setSearchFilters] = useState({
//         productCode: '',
//         productName: '',
//         purchasePrice: '',
//         quantity: '',
//         expiryDate: '',
//         sellingPrice: ''
//     });

//     // Fetch products on component mount
//     useEffect(() => {
//         const fetchProducts = async () => {
//             const url = `http://localhost:${PORT_NUMBER}/api/products/all`;
//             try {
//                 setIsLoading(true);
//                 const response = await axios.get(url);
//                 setProducts(response.data);
//                 setFilteredProducts(response.data);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error('Error fetching products', error);
//                 setError('Failed to load products');
//                 setIsLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     // Handle global search input changes
//     const handleGlobalSearchChange = (value) => {
//         setGlobalSearch(value);

//         // Filter products based on global search input
//         const filtered = products.filter(product =>
//             Object.values(product).some(val =>
//                 String(val).toLowerCase().includes(value.toLowerCase())
//             )
//         );

//         setFilteredProducts(filtered);
//     };

//     // Handle navigation to AddProduct page
//     const handleAddNewProduct = () => {
//         history.push('/product/add');
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
//                     placeholder="Search all products..."
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
//                     onClick={handleAddNewProduct}
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
//                     Add New Product
//                 </button>
//             </div>
//             <table>
//                 <thead>

//                     <tr>
//                         <th>Code</th>
//                         <th>Name</th>
//                         <th>Purchase Price</th>
//                         <th>Quantity</th>
//                         <th>Expiry Date</th>
//                         <th>Selling Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredProducts.map((product) => (
//                         <tr key={product.id}>
//                             <td>{product.productCode}</td>
//                             <td>{product.productName}</td>
//                             <td>{product.purchasePrice}</td>
//                             <td>{product.quantity}</td>
//                             <td>{product.expiryDate}</td>
//                             <td>{product.sellingPrice}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ProductList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PORT_NUMBER from '../../port_number';
import { useHistory } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalSearch, setGlobalSearch] = useState('');

    const history = useHistory();

    useEffect(() => {
        const fetchProducts = async () => {
            const url = `http://localhost:${PORT_NUMBER}/api/products/all`;
            try {
                setIsLoading(true);
                const response = await axios.get(url);
                setProducts(response.data);
                setFilteredProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products', error);
                setError('Failed to load products');
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleGlobalSearchChange = (value) => {
        setGlobalSearch(value);
        const filtered = products.filter(product =>
            Object.values(product).some(val =>
                String(val).toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredProducts(filtered);
    };

    const handleAddNewProduct = () => {
        history.push('/product/add');
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
                    <h2 className="text-2xl font-bold">Product Inventory</h2>
                    <button
                        onClick={handleAddNewProduct}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                        Add New Product
                    </button>
                </div>

                <div className="p-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search all products..."
                            value={globalSearch}
                            onChange={(e) => handleGlobalSearchChange(e.target.value)}
                            className="w-full px-3 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-sky-100 border-b">
                                <tr className="bg-sky-50">
                                    {['Code', 'Name', 'Purchase Price', 'Quantity', 'Expiry Date', 'Selling Price'].map(header => (
                                        <th key={header} className="p-3 text-left text-xs font-bold text-sky-800 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sky-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-sky-100 transition-colors duration-200">
                                        <td className="p-3 whitespace-nowrap">{product.productCode}</td>
                                        <td className="p-3 whitespace-nowrap">{product.productName}</td>
                                        <td className="p-3 whitespace-nowrap">${product.purchasePrice}</td>
                                        <td className="p-3 whitespace-nowrap">{product.quantity}</td>
                                        <td className="p-3 whitespace-nowrap">{product.expiryDate}</td>
                                        <td className="p-3 whitespace-nowrap text-green-600 font-semibold">${product.sellingPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;