// import React, { useState } from 'react'
// import Axios from 'axios';

// import Label from '../../components/label'
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
//         <div>
//             <div>Add a new user</div>
//             <form onSubmit={(e) => submitData(e)}>
//                 <Label text={"Full name"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="fullName"
//                     value={data.fullName}
//                     placeholder='Full name'
//                     required
//                 />
//                 <Label text={"Phone number"} /><br />
//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="phoneNumber"
//                     value={data.phoneNumber}
//                     placeholder='Phone number'
//                     type='number'
//                     required
//                 />
//                 <Label text={"Password"} /><br />
//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="password"
//                     value={data.password}
//                     placeholder='password'
//                     type='password'
//                     required
//                 />
//                 <Label text={"Address"} /><br />
//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="address"
//                     value={data.address}
//                     placeholder='address'
//                     required
//                 />
//                 <Button label={"Add"} />
//             </form>

//         </div>
//     )
// }

// export default AddClient

import React, { useState } from 'react';
import Axios from 'axios';
import Label from '../../components/label';
import Button from '../../components/button';
import PORT_NUMBER from '../../port_number';

function AddClient() {
    const url = `http://localhost:${PORT_NUMBER}/api/clients/add`;
    const [data, setData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        password: ""
    });

    function handleChange(e) {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

    function submitData(e) {
        e.preventDefault();
        Axios.post(url, {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            password: data.password
        }).then(response => {
            console.log('Client saved successfully', response);
            alert('Client saved successfully');
            setData({
                fullName: "",
                phoneNumber: "",
                address: "",
                password: ""
            });
        })
            .catch(error => {
                console.error('Error saving Client:', error);
                alert('Failed to save Client. Please try again.');
            });
    }

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-10 bg-white p-12 rounded-2xl shadow-2xl border border-sky-200">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-sky-700 tracking-tight">Create New Client Profile</h2>
                    <p className="mt-2 text-sm text-sky-600">Enter client details to add to the system</p>
                </div>

                <form onSubmit={(e) => submitData(e)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Full Name" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="fullName"
                                value={data.fullName}
                                placeholder='Enter full name'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                        <div>
                            <Label text="Phone Number" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="phoneNumber"
                                value={data.phoneNumber}
                                placeholder='Enter phone number'
                                type='tel'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>

                    <div>
                        <Label text="Password" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={(e) => handleChange(e)}
                            id="password"
                            type="password"
                            value={data.password}
                            placeholder='Create a secure password'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                        />
                    </div>

                    <div>
                        <Label text="Address" className="block mb-2 text-sm font-medium text-sky-700" />
                        <textarea
                            onChange={(e) => handleChange(e)}
                            id="address"
                            value={data.address}
                            placeholder='Enter full address'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            rows={3}
                        />
                    </div>

                    <div>
                        <Button
                            label="Add Client"
                            className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddClient;