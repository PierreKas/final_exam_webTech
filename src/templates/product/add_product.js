// import React, { useState } from 'react'
// import Axios from 'axios';
// import Label from '../../components/label'
// import Button from '../../components/button';
// import PORT_NUMBER from '../../port_number';
// function AddProduct() {

//     const url = `http://localhost:${PORT_NUMBER}/api/products/add`;
//     const [data, setData] = useState({
//         productCode: "",
//         productName: "",
//         purchasePrice: "",
//         quantity: "",
//         expiryDate: "",
//         sellingPrice: "",
//     });

//     function handleChange(e) {
//         const newData = { ...data };
//         newData[e.target.id] = e.target.value;
//         setData(newData);
//     }

//     function submitData(e) {
//         e.preventDefault();
//         Axios.post(url, {
//             productCode: data.productCode,
//             productName: data.productName,
//             purchasePrice: data.purchasePrice,
//             quantity: data.quantity,
//             expiryDate: data.expiryDate,
//             sellingPrice: data.sellingPrice,
//         }).then(response => {
//             console.log('Product saved successfully', response);
//             alert('Product saved successfully');
//             setData({
//                 productCode: "",
//                 productName: "",
//                 purchasePrice: "",
//                 quantity: "",
//                 expiryDate: "",
//                 sellingPrice: "",
//             });
//         })
//             .catch(error => {
//                 console.error('Error creating product:', error);
//                 alert('Failed to add product. Please try again.');
//             });
//     }
//     return (
//         <div>
//             <div>Add a new product Here</div>
//             <form onSubmit={(e) => submitData(e)}>
//                 <Label text={"Product code"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="productCode"
//                     value={data.productCode}
//                     placeholder='Product code'
//                     required
//                 />
//                 <Label text={"Product name"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="productName"
//                     value={data.productName}
//                     placeholder='Product name'
//                     required
//                 />
//                 <Label text={"Purchase price"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="purchasePrice"
//                     value={data.purchasePrice}
//                     placeholder='Purchase price'
//                     type='number'
//                     required
//                 />
//                 <Label text={"Quantity"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="quantity"
//                     value={data.quantity}
//                     placeholder='quantity'
//                     type='number'
//                     required
//                 />
//                 <Label text={"Expiry date"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="expiryDate"
//                     value={data.expiryDate}
//                     placeholder='Expiry Date'
//                     type='date'
//                     required
//                 />
//                 <Label text={"Selling price"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="sellingPrice"
//                     value={data.sellingPrice}
//                     placeholder='Selling Price'
//                     type='number'
//                     required
//                 />
//                 <Button label={"Add"} />
//             </form>

//         </div>
//     )
// }

// export default AddProduct



import React, { useState } from 'react'
import Axios from 'axios';
import Label from '../../components/label'
import Button from '../../components/button';
import PORT_NUMBER from '../../port_number';

function AddProduct() {
    const url = `http://localhost:${PORT_NUMBER}/api/products/add`;
    const [data, setData] = useState({
        productCode: "",
        productName: "",
        purchasePrice: "",
        quantity: "",
        expiryDate: "",
        sellingPrice: "",
    });

    function handleChange(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function submitData(e) {
        e.preventDefault();
        Axios.post(url, {
            productCode: data.productCode,
            productName: data.productName,
            purchasePrice: data.purchasePrice,
            quantity: data.quantity,
            expiryDate: data.expiryDate,
            sellingPrice: data.sellingPrice,
        }).then(response => {
            console.log('Product saved successfully', response);
            alert('Product saved successfully');
            setData({
                productCode: "",
                productName: "",
                purchasePrice: "",
                quantity: "",
                expiryDate: "",
                sellingPrice: "",
            });
        })
            .catch(error => {
                console.error('Error creating product:', error);
                alert('Failed to add product. Please try again.');
            });
    }

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-10 bg-white p-12 rounded-2xl shadow-2xl border border-sky-200">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-sky-700 tracking-tight">Add a New Product</h2>
                    <p className="mt-2 text-sm text-sky-600">Enter product details to add to the system</p>
                </div>

                <form onSubmit={(e) => submitData(e)} className="space-y-8">
                    <div>
                        <Label text="Product Code" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={(e) => handleChange(e)}
                            id="productCode"
                            value={data.productCode}
                            placeholder='Product code'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                        />
                    </div>

                    <div>
                        <Label text="Product Name" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={(e) => handleChange(e)}
                            id="productName"
                            value={data.productName}
                            placeholder='Product name'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Purchase Price" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="purchasePrice"
                                value={data.purchasePrice}
                                placeholder='Purchase price'
                                type='number'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                        <div>
                            <Label text="Quantity" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="quantity"
                                value={data.quantity}
                                placeholder='Quantity'
                                type='number'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Expiry Date" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="expiryDate"
                                value={data.expiryDate}
                                placeholder='Expiry Date'
                                type='date'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                        <div>
                            <Label text="Selling Price" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="sellingPrice"
                                value={data.sellingPrice}
                                placeholder='Selling Price'
                                type='number'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            label="Add Product"
                            className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;