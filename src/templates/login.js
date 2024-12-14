// import React, { useState } from 'react'
// import Axios from 'axios';
// import Label from './../components/label'
// import Button from './../components/button';
// import PORT_NUMBER from './../port_number';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom';

// function Login() {
//     const url = `http://localhost:${PORT_NUMBER}/api/users/login`;
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     });
//     const history = useHistory()

//     function handleChange(e) {
//         const newData = { ...data };
//         newData[e.target.id] = e.target.value;
//         setData(newData);
//     }

//     function submitData(e) {
//         e.preventDefault();
//         Axios.post(url, {
//             email: data.email,
//             password: data.password
//         }).then(response => {
//             console.log('Success login', response);
//             // Navigate to OTP page and pass email
//             history.push({
//                 pathname: '/otp',
//                 state: { email: data.email }
//             });
//         })
//             .catch(error => {
//                 console.error('Error when trying to login:', error);
//                 alert('Failed to login. Please try again.');
//                 setData({
//                     email: "",
//                     password: "",
//                 });
//             });
//     }

//     return (
//         <div>
//             <div>Login</div>
//             <form onSubmit={(e) => submitData(e)}>
//                 <Label text={"email"} /><br />
//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="email"
//                     value={data.email}  // Fixed: changed from data.name
//                     placeholder='myemail@gmail.com'
//                     required
//                 />
//                 <Label text={"Password"} /><br />
//                 <input
//                     onChange={(e) => handleChange(e)}
//                     id="password"
//                     value={data.password}  // Fixed: changed from data.address
//                     type="password"
//                     placeholder='password'
//                     required
//                 />

//                 <Button label={"Login"} />
//             </form>
//             <button >
//                 Forget password
//             </button>
//         </div>
//     )
// }

// export default Login


// import React, { useState } from 'react'
// import Axios from 'axios';
// import Label from './../components/label'
// import Button from './../components/button';
// import PORT_NUMBER from './../port_number';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom';

// function Login() {
//     const url = `http://localhost:${PORT_NUMBER}/api/users/login`;
//     const forgotPasswordUrl = `http://localhost:${PORT_NUMBER}/api/pwd/forgot-password`;
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     });
//     const history = useHistory();

//     function handleChange(e) {
//         const newData = { ...data };
//         newData[e.target.id] = e.target.value;
//         setData(newData);
//     }

//     function resetPassword() {
//         if (!data.email.trim()) {
//             alert('Please enter an email address before requesting password reset');
//             return;
//         }
//         Axios.post(forgotPasswordUrl, null, {
//             params: {
//                 email: data.email
//             }
//         })
//             .then(response => {
//                 alert(response.data);
//                 history.push({
//                     pathname: '/reset-password',
//                     state: { email: data.email }
//                 });
//             })
//             .catch(error => {
//                 console.error('Error initiating password reset:', error);
//                 alert(error.response?.data || 'Failed to initiate password reset. Please try again.');
//             });
//     }

//     function submitData(e) {
//         e.preventDefault();
//         Axios.post(url, {
//             email: data.email,
//             password: data.password
//         }).then(response => {
//             console.log('Success login', response);
//             history.push({
//                 pathname: '/otp',
//                 state: { email: data.email }
//             });
//         })
//             .catch(error => {
//                 console.error('Error when trying to login:', error);
//                 alert('Failed to login. Please try again.');
//                 setData({
//                     email: "",
//                     password: "",
//                 });
//             });
//     }

//     return (
//         <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
//                 <div className="text-center">
//                     <h2 className="mt-6 text-3xl font-extrabold text-sky-600">Login</h2>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={(e) => submitData(e)}>
//                     <div className="rounded-md shadow-sm -space-y-px">
//                         <div className="mb-4">
//                             <Label text="Email" className="sr-only" />
//                             <input
//                                 onChange={(e) => handleChange(e)}
//                                 id="email"
//                                 type="email"
//                                 value={data.email}
//                                 placeholder='myemail@gmail.com'
//                                 required
//                                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-sky-300 placeholder-sky-500 text-sky-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
//                             />
//                         </div>
//                         <div>
//                             <Label text="Password" className="sr-only" />
//                             <input
//                                 onChange={(e) => handleChange(e)}
//                                 id="password"
//                                 type="password"
//                                 value={data.password}
//                                 placeholder='password'
//                                 required
//                                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-sky-300 placeholder-sky-500 text-sky-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <button
//                             type="button"
//                             onClick={resetPassword}
//                             className="font-medium text-sky-600 hover:text-sky-500 transition duration-200"
//                         >
//                             Forgot password?
//                         </button>
//                     </div>

//                     <div>
//                         <Button
//                             label="Login"
//                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-200"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login


import React, { useState } from 'react'
import Axios from 'axios';
import Label from './../components/label'
import Button from './../components/button';
import PORT_NUMBER from './../port_number';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Login() {
    const url = `http://localhost:${PORT_NUMBER}/api/users/login`;
    const forgotPasswordUrl = `http://localhost:${PORT_NUMBER}/api/pwd/forgot-password`;
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function handleChange(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function resetPassword() {
        if (!data.email.trim()) {
            alert('Please enter an email address before requesting password reset');
            return;
        }
        setIsLoading(true);
        Axios.post(forgotPasswordUrl, null, {
            params: {
                email: data.email
            }
        })
            .then(response => {
                setIsLoading(false);
                alert(response.data);
                history.push({
                    pathname: '/reset-password',
                    state: { email: data.email }
                });
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error initiating password reset:', error);
                alert(error.response?.data || 'Failed to initiate password reset. Please try again.');
            });
    }

    function submitData(e) {
        e.preventDefault();
        setIsLoading(true);
        Axios.post(url, {
            email: data.email,
            password: data.password
        }).then(response => {
            setIsLoading(false);
            alert('Ckeck your email for 2 factor authentication by OTP')
            console.log('Success login', response);
            history.push({
                pathname: '/otp',
                state: { email: data.email }
            });
        })
            .catch(error => {
                setIsLoading(false);
                console.error('Error when trying to login:', error);
                alert('Failed to login. Please try again.');
                setData({
                    email: "",
                    password: "",
                });

            });
    }

    return (

        <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-600"></div>
                    </div>
                )}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-sky-600">Login</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => submitData(e)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <Label text="Email" className="sr-only" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="email"
                                type="email"
                                value={data.email}
                                placeholder='myemail@gmail.com'
                                required
                                disabled={isLoading}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-sky-300 placeholder-sky-500 text-sky-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <Label text="Password" className="sr-only" />
                            <input
                                onChange={(e) => handleChange(e)}
                                id="password"
                                type="password"
                                value={data.password}
                                placeholder='password'
                                required
                                disabled={isLoading}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-sky-300 placeholder-sky-500 text-sky-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={resetPassword}
                            disabled={isLoading}
                            className="font-medium text-sky-600 hover:text-sky-500 transition duration-200 disabled:opacity-50"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <div>
                        <Button
                            label="Login"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-200"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login