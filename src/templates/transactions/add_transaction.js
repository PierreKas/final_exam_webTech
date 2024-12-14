// // import React, { useState, useEffect } from 'react'
// // import Axios from 'axios';

// // import Label from '../../components/label'
// // import Button from '../../components/button';
// // import Input from '../../components/input';
// // import PORT_NUMBER from '../../port_number';

// // function AddTransaction() {

// //     const url = `http://localhost:${PORT_NUMBER}/api/transactions/add`;
// //     const [sellingPoints, setSellingPoints] = useState([]);
// //     const [products, setProducts] = useState([]);
// //     const [clients, setClients] = useState([]);
// //     const [data, setData] = useState({
// //         billCode: "",
// //         product: { productCode: "", unitPrice: "" },
// //         quantity: "",
// //         totalPrice: "",
// //         client: { clientId: "" },
// //         sellingPoint: { sellingPointId: "" }

// //     });

// //     function handleChange(e) {
// //         const { id, value } = e.target;

// //         if (id === 'sellingPoint') {

// //             setData(prevData => ({
// //                 ...prevData,
// //                 sellingPoint: { sellingPointId: value }

// //             }));
// //             console.log(value)
// //         } else if (id === 'product') {
// //             const selectedProduct = products.find(p => p.productCode === value);
// //             setData(prevData => ({
// //                 ...prevData,
// //                 product: { productCode: value, unitPrice: selectedProduct ? selectedProduct.sellingPrice : 'no' }

// //             }));

// //             console.log(value)
// //         }
// //         else if (id === 'client') {
// //             setData(prevData => ({
// //                 ...prevData,
// //                 client: { clientId: value }

// //             }));
// //             console.log(value)
// //         }

// //         else {
// //             setData(prevData => ({
// //                 ...prevData,
// //                 [id]: value
// //             }));
// //         }
// //     }

// //     useEffect(() => {
// //         Axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`)
// //             .then(response => {
// //                 setSellingPoints(response.data);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching selling points:', error);
// //                 alert('Failed to load selling points');
// //             });
// //         Axios.get(`http://localhost:${PORT_NUMBER}/api/products/all`)
// //             .then(response => {
// //                 setProducts(response.data);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching products', error);
// //                 alert('Failed to load products');
// //             });
// //         Axios.get(`http://localhost:${PORT_NUMBER}/api/clients/all`)
// //             .then(response => {
// //                 setClients(response.data);
// //             })
// //             .catch(error => {
// //                 console.error('Error fetching clients', error);
// //                 alert('Failed to load clients');
// //             });

// //     }, []);

// //     function submitData(e) {
// //         e.preventDefault();
// //         Axios.post(url, {
// //             billCode: data.billCode,
// //             product: { productCode: data.product.productCode, unitPrice: data.product.unitPrice },
// //             quantity: data.quantity,
// //             totalPrice: data.totalPrice,
// //             client: { clientId: data.client.clientId },
// //             sellingPoint: { sellingPointId: data.sellingPoint.sellingPointId }
// //         }).then(response => {
// //             console.log('Transaction saved successfully', response);
// //             alert('Transaction saved successfully');
// //             setData({
// //                 billCode: "",
// //                 product: { productCode: "", unitPrice: "" },
// //                 quantity: "",
// //                 totalPrice: "",
// //                 client: { clientId: "" },
// //                 sellingPoint: { sellingPointId: "" }
// //             });
// //         })
// //             // .catch(error => {
// //             //     console.error('Error saving Transaction:', error);
// //             //     alert('Failed to save Transaction. Please try again.');
// //             // });
// //             .catch(error => {
// //                 if (error.response && error.response.status === 500) {
// //                     // Check if the error message is about stock
// //                     const errorMessage = error.response.data.message || error.response.data;

// //                     if (errorMessage.includes('The stock is not enough')) {
// //                         // Show a user-friendly alert about insufficient stock
// //                         alert('Insufficient stock! The requested quantity exceeds available product quantity.');

// //                         // Optionally, you can also set a state to show the error in the UI
// //                         // setStockError('Insufficient stock for this product');
// //                     } else {
// //                         // Handle other 500 errors
// //                         alert('An error occurred while processing the transaction.');
// //                     }
// //                 } else {
// //                     // Handle other types of errors
// //                     alert('An unexpected error occurred.');
// //                 }
// //             });
// //     }
// // }
// // return (
// //     <div>
// //         <div>Add a new transaction</div>
// //         <form onSubmit={(e) => submitData(e)}>
// //             <Label text={"Bill code"} /><br />

// //             <input
// //                 onChange={(e) => handleChange(e)}
// //                 id="billCode"
// //                 value={data.billCode}
// //                 placeholder='billCode'
// //                 required
// //             />
// //             <Label text={"Product name"} /><br />
// //             <select
// //                 id="product"
// //                 value={data.product.productCode}
// //                 onChange={handleChange}
// //                 required
// //             >
// //                 <option value="">Select a product</option>
// //                 {products.map(point => (
// //                     <option
// //                         key={point.productCode}
// //                         value={point.productCode}
// //                     >
// //                         {point.productName}
// //                     </option>
// //                 ))}
// //             </select>
// //             <Label text={"Unit price"} /><br />
// //             <input
// //                 onChange={(e) => handleChange(e)}
// //                 id="product"
// //                 value={data.product.unitPrice}
// //                 placeholder='0.0'
// //                 disabled
// //                 required
// //             />
// //             <Label text={"Quantity"} /><br />

// //             <input
// //                 onChange={(e) => handleChange(e)}
// //                 id="quantity"
// //                 value={data.quantity}
// //                 placeholder='0'
// //                 type='number'
// //                 required

// //             />
// //             <Label text={"Total price"} /><br />
// //             <input
// //                 onChange={(e) => handleChange(e)}
// //                 id="totalPrice"
// //                 value={data.totalPrice = data.product.unitPrice * data.quantity}
// //                 placeholder='0.0'
// //                 disabled
// //                 required
// //             />
// //             <Label text={"Client"} /><br />
// //             <select
// //                 id="client"
// //                 value={data.client.clientId}
// //                 onChange={handleChange}
// //                 required
// //             >
// //                 <option value="">Select a client</option>
// //                 {clients.map(point => (
// //                     <option
// //                         key={point.clientId}
// //                         value={point.clientId}
// //                     >
// //                         {point.fullName}
// //                     </option>
// //                 ))}
// //             </select>
// //             <Label text={"Selling point"} /><br />
// //             <select
// //                 id="sellingPoint"
// //                 value={data.sellingPoint.sellingPointId}
// //                 onChange={handleChange}
// //                 required
// //             >
// //                 <option value="">Select a selling point</option>
// //                 {sellingPoints.map(point => (
// //                     <option
// //                         key={point.sellingPointId}
// //                         value={point.sellingPointId}
// //                     >
// //                         {point.name}
// //                     </option>
// //                 ))}
// //             </select>
// //             <Button label={"Add"} />
// //         </form>

// //     </div>
// // )}


// // export default AddTransaction


// import React, { useState, useEffect } from 'react'
// import Axios from 'axios';

// import Label from '../../components/label'
// import Button from '../../components/button';
// import Input from '../../components/input';
// import PORT_NUMBER from '../../port_number';

// function AddTransaction() {
//     const url = `http://localhost:${PORT_NUMBER}/api/transactions/add`;
//     const [sellingPoints, setSellingPoints] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [clients, setClients] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [data, setData] = useState({
//         billCode: "",
//         product: { productCode: "", unitPrice: "" },
//         quantity: "",
//         totalPrice: "",
//         client: { clientId: "" },
//         sellingPoint: { sellingPointId: "" }
//     });

//     function handleChange(e) {
//         const { id, value } = e.target;
//         setErrorMessage(''); // Clear any previous error messages

//         if (id === 'sellingPoint') {
//             setData(prevData => ({
//                 ...prevData,
//                 sellingPoint: { sellingPointId: value }
//             }));
//         } else if (id === 'product') {
//             const selectedProduct = products.find(p => p.productCode === value);
//             setData(prevData => ({
//                 ...prevData,
//                 product: {
//                     productCode: value,
//                     unitPrice: selectedProduct ? selectedProduct.sellingPrice : 'no'
//                 }
//             }));
//         }
//         else if (id === 'client') {
//             setData(prevData => ({
//                 ...prevData,
//                 client: { clientId: value }
//             }));
//         }
//         else {
//             setData(prevData => ({
//                 ...prevData,
//                 [id]: value
//             }));
//         }
//     }

//     useEffect(() => {
//         Axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`)
//             .then(response => {
//                 setSellingPoints(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching selling points:', error);
//                 setErrorMessage('Failed to load selling points');
//             });
//         Axios.get(`http://localhost:${PORT_NUMBER}/api/products/all`)
//             .then(response => {
//                 setProducts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching products', error);
//                 setErrorMessage('Failed to load products');
//             });
//         Axios.get(`http://localhost:${PORT_NUMBER}/api/clients/all`)
//             .then(response => {
//                 setClients(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching clients', error);
//                 setErrorMessage('Failed to load clients');
//             });
//     }, []);

//     function submitData(e) {
//         e.preventDefault();
//         //Here I Convert quantity to a number and check if it's positive
//         const quantity = Number(data.quantity);
//         if (isNaN(quantity) || quantity <= 0) {
//             setErrorMessage('Quantity must be a positive number');
//             return;
//         }

//         Axios.post(url, {
//             billCode: data.billCode,
//             product: {
//                 productCode: data.product.productCode,
//                 unitPrice: data.product.unitPrice
//             },
//             quantity: quantity,
//             totalPrice: data.totalPrice,
//             client: { clientId: data.client.clientId },
//             sellingPoint: { sellingPointId: data.sellingPoint.sellingPointId }
//         }).then(response => {
//             console.log('Transaction saved successfully', response);
//             alert('Transaction saved successfully');
//             // Reset form
//             setData({
//                 billCode: "",
//                 product: { productCode: "", unitPrice: "" },
//                 quantity: "",
//                 totalPrice: "",
//                 client: { clientId: "" },
//                 sellingPoint: { sellingPointId: "" }
//             });
//         })

//             .catch(error => {
//                 if (error.response) {
//                     console.error('Full error response:', error.response);


//                     if (error.response.status === 500) {
//                         const errorMessage = error.response.data.message ||
//                             error.response.data.error ||
//                             'Unknown server error';


//                         if (errorMessage.includes('The stock is not enough')) {
//                             setErrorMessage('Insufficient stock. The requested quantity is not available, try to reduce');
//                             alert('Insufficient stock. The requested quantity is not available, try to reduce');
//                         } else if (errorMessage.includes('')) {
//                             setErrorMessage('Few items remain in the stock');
//                             alert('Few items remain in the stock');

//                         }

//                         else {

//                             setErrorMessage(errorMessage);
//                             alert(`Failed to save transaction: ${errorMessage}`);
//                         }
//                     } else {

//                         console.error('Error saving transaction:', error.response.data);
//                         alert('Failed to save transaction. Please try again.');
//                     }

//                 }
//             });

//     }

//     return (
//         <div>
//             <div>Add a new transaction</div>
//             {errorMessage && (
//                 <div style={{ color: 'red', marginBottom: '10px' }}>
//                     {errorMessage}
//                 </div>
//             )}
//             <form onSubmit={submitData}>
//                 <Label text={"Bill code"} /><br />
//                 <input
//                     onChange={handleChange}
//                     id="billCode"
//                     value={data.billCode}
//                     placeholder='billCode'
//                     required
//                 />
//                 <Label text={"Product name"} /><br />
//                 <select
//                     id="product"
//                     value={data.product.productCode}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="">Select a product</option>
//                     {products.map(point => (
//                         <option
//                             key={point.productCode}
//                             value={point.productCode}
//                         >
//                             {point.productName}
//                         </option>
//                     ))}
//                 </select>
//                 <Label text={"Unit price"} /><br />
//                 <input
//                     onChange={handleChange}
//                     id="product"
//                     value={data.product.unitPrice}
//                     placeholder='0.0'
//                     disabled
//                     required
//                 />
//                 <Label text={"Quantity"} /><br />
//                 <input
//                     onChange={handleChange}
//                     id="quantity"
//                     value={data.quantity}
//                     placeholder='0'
//                     type='number'
//                     required
//                 />
//                 <Label text={"Total price"} /><br />
//                 <input
//                     onChange={handleChange}
//                     id="totalPrice"
//                     value={data.totalPrice = data.product.unitPrice * data.quantity}
//                     placeholder='0.0'
//                     disabled
//                     required
//                 />
//                 <Label text={"Client"} /><br />
//                 <select
//                     id="client"
//                     value={data.client.clientId}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="">Select a client</option>
//                     {clients.map(point => (
//                         <option
//                             key={point.clientId}
//                             value={point.clientId}
//                         >
//                             {point.fullName}
//                         </option>
//                     ))}
//                 </select>
//                 <Label text={"Selling point"} /><br />
//                 <select
//                     id="sellingPoint"
//                     value={data.sellingPoint.sellingPointId}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="">Select a selling point</option>
//                     {sellingPoints.map(point => (
//                         <option
//                             key={point.sellingPointId}
//                             value={point.sellingPointId}
//                         >
//                             {point.name}
//                         </option>
//                     ))}
//                 </select>
//                 <Button label={"Add"} />
//             </form>
//         </div>
//     );
// }

// export default AddTransaction;



import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Label from '../../components/label'
import Button from '../../components/button';
import PORT_NUMBER from '../../port_number';

function AddTransaction() {
    const url = `http://localhost:${PORT_NUMBER}/api/transactions/add`;
    const [sellingPoints, setSellingPoints] = useState([]);
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({
        billCode: "",
        product: { id: "", sellingPrice: "" },
        quantity: "",
        totalPrice: "",
        client: { clientId: "" },
        sellingPoint: { sellingPointId: "" }
    });

    function handleChange(e) {
        const { id, value } = e.target;
        setErrorMessage('');

        if (id === 'sellingPoint') {
            setData(prevData => ({
                ...prevData,
                sellingPoint: { sellingPointId: value }
            }));
        } else if (id === 'product') {
            // Convert value to a number for comparison
            const productId = Number(value);

            const selectedProduct = products.find(p => p.id === productId);

            if (selectedProduct) {
                setData(prevData => ({
                    ...prevData,
                    product: {
                        id: value, // Keep original value for form submission
                        sellingPrice: selectedProduct.sellingPrice || '0'
                    }
                }));
                console.log('Selected Product:', selectedProduct);
                console.log('Selling Price:', selectedProduct.sellingPrice);
            } else {
                console.error('No product found with ID:', productId);
                setData(prevData => ({
                    ...prevData,
                    product: {
                        id: '',
                        sellingPrice: '0'
                    }
                }));
            }
        }
        else if (id === 'client') {
            setData(prevData => ({
                ...prevData,
                client: { clientId: value }
            }));
        }
        else {
            setData(prevData => ({
                ...prevData,
                [id]: value
            }));
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`)
            .then(response => {
                setSellingPoints(response.data);
            })
            .catch(error => {
                console.error('Error fetching selling points:', error);
                setErrorMessage('Failed to load selling points');
            });
        Axios.get(`http://localhost:${PORT_NUMBER}/api/products/all`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products', error);
                setErrorMessage('Failed to load products');
            });
        Axios.get(`http://localhost:${PORT_NUMBER}/api/clients/all`)
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('Error fetching clients', error);
                setErrorMessage('Failed to load clients');
            });
    }, []);

    function submitData(e) {
        e.preventDefault();
        const quantity = Number(data.quantity);
        if (isNaN(quantity) || quantity <= 0) {
            setErrorMessage('Quantity must be a positive number');
            return;
        }

        Axios.post(url, {
            billCode: data.billCode,
            product: {
                id: data.product.id,
                sellingPrice: data.product.sellingPrice
            },
            quantity: quantity,
            totalPrice: data.totalPrice,
            client: { clientId: data.client.clientId },
            sellingPoint: { sellingPointId: data.sellingPoint.sellingPointId }
        }).then(response => {
            console.log('Transaction saved successfully', response);
            alert('Transaction saved successfully');
            setData({
                billCode: "",
                product: { id: "", sellingPrice: "" },
                quantity: "",
                totalPrice: "",
                client: { clientId: "" },
                sellingPoint: { sellingPointId: "" }
            });
        })
            .catch(error => {
                if (error.response) {
                    console.error('Full error response:', error.response);
                    if (error.response.status === 500) {
                        const errorMessage = error.response.data.message ||
                            error.response.data.error ||
                            'Unknown server error';

                        if (errorMessage.includes('The stock is not enough')) {
                            setErrorMessage('Insufficient stock. The requested quantity is not available, try to reduce');
                            alert('Insufficient stock. The requested quantity is not available, try to reduce');
                        } else if (errorMessage.includes('')) {
                            setErrorMessage('Few items remain in the stock');
                            alert('Few items remain in the stock');
                        } else {
                            setErrorMessage(errorMessage);
                            alert(`Failed to save transaction: ${errorMessage}`);
                        }
                    } else {
                        console.error('Error saving transaction:', error.response.data);
                        alert('Failed to save transaction. Please try again.');
                    }
                }
            });
    }

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-10 bg-white p-12 rounded-2xl shadow-2xl border border-sky-200">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-sky-700 tracking-tight">Create New Transaction</h2>
                    <p className="mt-2 text-sm text-sky-600">Enter transaction details to add to the system</p>
                </div>

                {errorMessage && (
                    <div className="text-red-500 text-center mb-4">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={submitData} className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Bill Code" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={handleChange}
                                id="billCode"
                                value={data.billCode}
                                placeholder='Enter bill code'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                        <div>
                            <Label text="Product" className="block mb-2 text-sm font-medium text-sky-700" />
                            <select
                                id="product"
                                value={data.product.id}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            >
                                <option value="">Select a product</option>
                                {products.map(point => (
                                    <option
                                        key={point.id}
                                        value={point.id}
                                    >
                                        {point.productName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Unit Price" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={handleChange}
                                id="product"
                                value={data.product.sellingPrice}
                                placeholder='0.0'
                                disabled
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 bg-gray-100"
                            />
                        </div>
                        <div>
                            <Label text="Quantity" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={handleChange}
                                id="quantity"
                                value={data.quantity}
                                placeholder='0'
                                type='number'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>

                    <div>
                        <Label text="Total Price" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={handleChange}
                            id="totalPrice"
                            value={data.totalPrice = data.product.sellingPrice * data.quantity}
                            placeholder='0.0'
                            disabled
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 bg-gray-100"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Client" className="block mb-2 text-sm font-medium text-sky-700" />
                            <select
                                id="client"
                                value={data.client.clientId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            >
                                <option value="">Select a client</option>
                                {clients.map(point => (
                                    <option
                                        key={point.clientId}
                                        value={point.clientId}
                                    >
                                        {point.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label text="Selling Point" className="block mb-2 text-sm font-medium text-sky-700" />
                            <select
                                id="sellingPoint"
                                value={data.sellingPoint.sellingPointId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            >
                                <option value="">Select a selling point</option>
                                {sellingPoints.map(point => (
                                    <option
                                        key={point.sellingPointId}
                                        value={point.sellingPointId}
                                    >
                                        {point.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <Button
                            label="Add Transaction"
                            className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTransaction;