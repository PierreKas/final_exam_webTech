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
//         <div>
//             <div>Create a new selling point here</div>
//             <form onSubmit={(e) => submitData(e)}>
//                 <Label text={"Selling point name"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="name"
//                     value={data.name}
//                     placeholder='Selling point name'
//                     className='classe'

//                     required
//                 />
//                 <Label text={"Selling point address"} /><br />
//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="address"
//                     value={data.address}
//                     placeholder='Selling point address'

//                     required
//                 />
//                 <Button label={"Create"} />
//             </form>

//         </div>
//     )
// }

// export default AddSellingPoint


//////===========

import React, { useState } from 'react'
import Axios from 'axios';
import Label from '../../components/label'
import Button from '../../components/button';
import PORT_NUMBER from '../../port_number';

function AddSellingPoint() {
    const url = `http://localhost:${PORT_NUMBER}/api/selling-point/add`;
    const [data, setData] = useState({
        name: "",
        address: "",
    });

    function handleChange(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function submitData(e) {
        e.preventDefault();
        Axios.post(url, {
            name: data.name,
            address: data.address
        }).then(response => {
            console.log('Selling point saved successfully', response);
            alert('Selling point saved successfully');
            setData({
                name: "",
                address: ""
            });
        })
            .catch(error => {
                console.error('Error saving Selling point:', error);
                alert('Failed to save selling point. Please try again.');
            });
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-10 bg-sky-50 p-12 rounded-2xl shadow-2xl border border-sky-200">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-sky-700 tracking-tight">Create New Selling Point</h2>
                    <p className="mt-2 text-sm text-sky-600">Enter details for a new selling point</p>
                </div>
                <form onSubmit={(e) => submitData(e)} className="space-y-6">
                    <div>
                        <Label text="Selling Point Name" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={(e) => handleChange(e)}
                            id="name"
                            value={data.name}
                            placeholder='Enter selling point name'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
                        />
                    </div>
                    <div>
                        <Label text="Selling Point Address" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={(e) => handleChange(e)}
                            id="address"
                            value={data.address}
                            placeholder='Enter selling point address'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out bg-white"
                        />
                    </div>
                    <div>
                        <Button
                            label="Create Selling Point"
                            className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSellingPoint;