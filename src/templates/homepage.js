// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PORT_NUMBER from './../port_number';

// function HomePage() {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
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

//     // Handle search input changes
//     const handleSearchChange = (column, value) => {
//         const newFilters = { ...searchFilters, [column]: value };
//         setSearchFilters(newFilters);

//         // Filter products based on all search inputs
//         const filtered = products.filter(product =>
//             Object.keys(newFilters).every(key =>
//                 newFilters[key] === '' ||
//                 String(product[key]).toLowerCase().includes(newFilters[key].toLowerCase())
//             )
//         );

//         setFilteredProducts(filtered);
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <table>
//                 <thead>
//                     <tr>

//                         {['productCode', 'productName', 'purchasePrice', 'quantity', 'expiryDate', 'sellingPrice'].map(column => (
//                             <th key={column}>
//                                 <input
//                                     type="text"
//                                     placeholder={`Search ${column}`}
//                                     value={searchFilters[column]}
//                                     onChange={(e) => handleSearchChange(column, e.target.value)}
//                                 // style={{ width: '100%', marginBottom: '10px' }}
//                                 />
//                             </th>
//                         ))}
//                     </tr>
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

// export default HomePage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PORT_NUMBER from './../port_number';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchFilters, setSearchFilters] = useState({
        productCode: '',
        productName: '',
        purchasePrice: '',
        quantity: '',
        expiryDate: '',
        sellingPrice: ''
    });


    // Fetch products on component mount
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

    // Handle search input changes
    const handleSearchChange = (column, value) => {
        const newFilters = { ...searchFilters, [column]: value };
        setSearchFilters(newFilters);

        // Filter products based on all search inputs
        const filtered = products.filter(product =>
            Object.keys(newFilters).every(key =>
                newFilters[key] === '' ||
                String(product[key]).toLowerCase().includes(newFilters[key].toLowerCase())
            )
        );

        setFilteredProducts(filtered);
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
                <div className="bg-sky-600 text-white p-4">
                    <h2 className="text-2xl font-bold">Product Inventory</h2>
                </div>

                <div className="p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-sky-100 border-b">
                                <tr>
                                    {['productCode', 'productName', 'purchasePrice', 'quantity', 'expiryDate', 'sellingPrice'].map(column => (
                                        <th key={column} className="p-3 text-left text-xs font-medium text-sky-700 uppercase tracking-wider">
                                            <input
                                                type="text"
                                                placeholder={`Search ${column}`}
                                                value={searchFilters[column]}
                                                onChange={(e) => handleSearchChange(column, e.target.value)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                                            />
                                        </th>
                                    ))}
                                </tr>
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

export default HomePage;