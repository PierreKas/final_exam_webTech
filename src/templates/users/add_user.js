// import React, { useState, useEffect } from 'react'
// import Axios from 'axios';

// import Label from '../../components/label'
// import Button from '../../components/button';
// import PORT_NUMBER from '../../port_number';

// function AddUser() {

//     const url = `http://localhost:${PORT_NUMBER}/api/users/add`;
//     const [sellingPoints, setSellingPoints] = useState([]);
//     const [data, setData] = useState({
//         fullName: "",
//         phoneNumber: "",
//         role: "",
//         sellingPoint: { sellingPointId: "" },
//         password: "",
//         email: ""
//     });

//     function handleChange(e) {
//         const { id, value } = e.target;

//         if (id === 'sellingPoint') {

//             setData(prevData => ({
//                 ...prevData,
//                 sellingPoint: { sellingPointId: value }

//             }));
//             console.log(value)
//         } else {
//             setData(prevData => ({
//                 ...prevData,
//                 [id]: value
//             }));
//         }
//     }

//     // function handleChange(e) {
//     //     const newData = { ...data };
//     //     newData[e.target.id] = e.target.value;
//     //     console.log(newData.fullName)
//     //     console.log(newData.role)
//     //     console.log(newData.sellingPoint)
//     //     setData(newData);
//     // }
//     // function handleChange(e) {
//     //     const { id, value } = e.target;
//     //     setData(prevData => {
//     //         if (id === 'sellingPoint') {
//     //             return {
//     //                 ...prevData,
//     //                 sellingPoint: { sellingPointId: value }
//     //             };
//     //         }
//     //         console.log(id)
//     //         return {
//     //             ...prevData,
//     //             [id]: value
//     //         };
//     //     });
//     // }
//     useEffect(() => {
//         Axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`)
//             .then(response => {
//                 setSellingPoints(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching selling points:', error);
//                 alert('Failed to load selling points');
//             });
//     }, []);

//     function submitData(e) {
//         e.preventDefault();
//         Axios.post(url, {
//             fullName: data.fullName,
//             phoneNumber: data.phoneNumber,
//             role: data.role,
//             sellingPoint: { sellingPointId: data.sellingPoint.sellingPointId },
//             password: data.password,
//             email: data.email
//         }).then(response => {
//             console.log('User saved successfully', response);
//             alert('User saved successfully');
//             setData({
//                 fullName: "",
//                 phoneNumber: "",
//                 role: "",
//                 sellingPoint: { sellingPointId: "" },
//                 password: "",
//                 email: ""
//             });
//         })
//             .catch(error => {
//                 console.error('Error saving user:', error);
//                 alert('Failed to save user. Please try again.');
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
//                 <Label text={"Email"} /><br />

//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="email"
//                     value={data.email}
//                     placeholder='myemail@gmail.com'
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
//                 <Label text={"Role"} /><br />
//                 <select
//                     id="role"
//                     value={data.role}
//                     onChange={handleChange}
//                     required

//                 >
//                     <option value="">Select a role</option>
//                     <option value="MANAGER">MANAGER</option>
//                     <option value="SELLER">SELLER</option>
//                 </select>
//                 <Label text={"Selling point"} /><br />
//                 {/* <select
//                     id="sellingPoint"
//                     value={data.sellingPointId}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="">Select a selling point</option>
//                     <option value="1">Selling point 1</option>
//                     <option value="2">React Test</option>
//                 </select> */}
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
//     )
// }

// export default AddUser



import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Label from '../../components/label'
import Button from '../../components/button';
import PORT_NUMBER from '../../port_number';

function AddUser() {
    const url = `http://localhost:${PORT_NUMBER}/api/users/add`;
    const [sellingPoints, setSellingPoints] = useState([]);
    const [data, setData] = useState({
        fullName: "",
        phoneNumber: "",
        role: "",
        sellingPoint: { sellingPointId: "" },
        password: "",
        email: ""
    });

    function handleChange(e) {
        const { id, value } = e.target;

        if (id === 'sellingPoint') {
            setData(prevData => ({
                ...prevData,
                sellingPoint: { sellingPointId: value }
            }));
        } else {
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
                alert('Failed to load selling points');
            });
    }, []);

    function submitData(e) {
        e.preventDefault();
        Axios.post(url, {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            role: data.role,
            sellingPoint: { sellingPointId: data.sellingPoint.sellingPointId },
            password: data.password,
            email: data.email
        }).then(response => {
            console.log('User saved successfully', response);
            alert('User saved successfully');
            setData({
                fullName: "",
                phoneNumber: "",
                role: "",
                sellingPoint: { sellingPointId: "" },
                password: "",
                email: ""
            });
        })
            .catch(error => {
                console.error('Error saving user:', error);
                alert('Failed to save user. Please try again.');
            });
    }

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-10 bg-white p-12 rounded-2xl shadow-2xl border border-sky-200">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-sky-700 tracking-tight">Create New User Profile</h2>
                    <p className="mt-2 text-sm text-sky-600">Enter user details to add to the system</p>
                </div>

                <form onSubmit={submitData} className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Full Name" className="block mb-2 text-sm font-medium text-sky-700" />
                            <input
                                onChange={handleChange}
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
                                onChange={handleChange}
                                id="phoneNumber"
                                value={data.phoneNumber}
                                placeholder='Enter phone number'
                                type='number'
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            />
                        </div>
                    </div>

                    <div>
                        <Label text="Email" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={handleChange}
                            id="email"
                            value={data.email}
                            placeholder='Enter email address'
                            type='email'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                        />
                    </div>

                    <div>
                        <Label text="Password" className="block mb-2 text-sm font-medium text-sky-700" />
                        <input
                            onChange={handleChange}
                            id="password"
                            value={data.password}
                            placeholder='Create a secure password'
                            type='password'
                            required
                            className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label text="Role" className="block mb-2 text-sm font-medium text-sky-700" />
                            <select
                                id="role"
                                value={data.role}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-sky-300 rounded-lg text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out"
                            >
                                <option value="">Select a role</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="SELLER">SELLER</option>
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
                            label="Add User"
                            className="w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser;