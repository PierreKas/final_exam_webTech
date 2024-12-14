// import React, { useEffect, useState } from 'react'
// import Axios from 'axios'
// import { useLocation, useHistory } from 'react-router-dom'
// import PORT_NUMBER from './../port_number';

// function ResetPassword() {
//     const location = useLocation();
//     const history = useHistory();
//     const [email, setEmail] = useState('');
//     const [inputValue, setInputValue] = useState("");
//     const [minutes, setMinutes] = useState(1);
//     const [seconds, setSeconds] = useState(30);
//     const [isOtpMode, setIsOtpMode] = useState(true);
//     const [newPassword, setNewPassword] = useState("");

//     // Get email from login page on component mount
//     useEffect(() => {
//         // Check if email is passed in location state
//         const emailFromLogin = location.state?.email;
//         console.log("Email from state:", emailFromLogin); // Add this for debugging

//         if (!emailFromLogin) {
//             // If no email is found, redirect back to login
//             history.push('/');
//             return;
//         }
//         setEmail(emailFromLogin);
//     }, [location, history]);

//     // Resend OTP
//     const resendOTP = async () => {
//         try {
//             const response = await Axios.post(
//                 `http://localhost:${PORT_NUMBER}/api/pwd/resend-otp`,
//                 { email: email },
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             // Reset timer
//             setMinutes(1);
//             setSeconds(30);
//             setInputValue(""); // Clear input when resending

//             alert("OTP Resent Successfully!");
//         } catch (error) {
//             console.error("Error resending OTP:", error);
//             alert("Failed to resend OTP");
//         }
//     };

//     // Reset Password (including OTP verification)
//     const resetPassword = async () => {
//         try {
//             const response = await Axios.post(
//                 `http://localhost:${PORT_NUMBER}/api/pwd/reset-password`,
//                 null,
//                 {
//                     params: {
//                         email: email,
//                         otp: inputValue,
//                         newPassword: newPassword
//                     }
//                 }
//             );

//             alert("Password Reset Successful!");
//             history.push('/login');
//         } catch (error) {
//             console.error("Error resetting password:", error);
//             alert("Password Reset Failed");
//         }
//     };

//     // Timer effect
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (seconds > 0) {
//                 setSeconds(seconds - 1);
//             }

//             if (seconds === 0) {
//                 if (minutes === 0) {
//                     clearInterval(interval)
//                 } else {
//                     setSeconds(59)
//                     setMinutes(minutes - 1)
//                 }
//             }
//         }, 1000);

//         return () => {
//             clearInterval(interval)
//         };
//     }, [minutes, seconds]);

//     return (
//         <div className="min-h-screen bg-white flex items-center justify-center px-4">
//             <div className="w-full max-w-md bg-sky-50 p-8 rounded-xl shadow-lg">
//                 <h2 className="text-2xl font-bold text-center text-sky-800 mb-6">
//                     {isOtpMode ? "OTP Verification" : "Reset Password"}
//                 </h2>

//                 {isOtpMode ? (
//                     <div>
//                         <div className="mb-4">
//                             <input
//                                 placeholder="Enter OTP"
//                                 value={inputValue}
//                                 type="text"
//                                 onChange={({ target }) => {
//                                     setInputValue(target.value)
//                                 }}
//                                 className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
//                             />
//                         </div>
//                         <div className="flex justify-between items-center mb-6">
//                             <p className="text-sky-700">
//                                 Time Remaining:{" "}
//                                 <span className="font-semibold">
//                                     {minutes < 10 ? `0${minutes}` : minutes}:
//                                     {seconds < 10 ? `0${seconds}` : seconds}
//                                 </span>
//                             </p>

//                             <button
//                                 disabled={seconds > 0 || minutes > 0}
//                                 onClick={resendOTP}
//                                 className={`px-4 py-2 rounded-md transition-colors duration-300 ${seconds > 0 || minutes > 0
//                                         ? "bg-sky-200 text-sky-400 cursor-not-allowed"
//                                         : "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800"
//                                     }`}
//                             >
//                                 Resend OTP
//                             </button>
//                         </div>

//                         <button
//                             onClick={() => setIsOtpMode(false)}
//                             disabled={inputValue.length === 0}
//                             className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 disabled:bg-sky-300 disabled:cursor-not-allowed"
//                         >
//                             SUBMIT OTP
//                         </button>
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="mb-4">
//                             <input
//                                 placeholder="Enter New Password"
//                                 value={newPassword}
//                                 type="password"
//                                 onChange={({ target }) => {
//                                     setNewPassword(target.value)
//                                     console.log(inputValue)
//                                 }}
//                                 className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
//                             />
//                             <input
//                                 placeholder="OTP value"
//                                 value={inputValue}
//                                 type="password"
//                                 onChange={({ target }) => {
//                                     setInputValue(target.value)
//                                 }}
//                                 disabled
//                                 className="w-full px-4 py-2 border border-sky-300 rounded-md bg-sky-100 text-sky-500 cursor-not-allowed"
//                             />
//                         </div>

//                         <button
//                             onClick={resetPassword}
//                             className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
//                         >
//                             Reset Password
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ResetPassword


import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import PORT_NUMBER from './../port_number';

function ResetPassword() {
    const location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const [isOtpMode, setIsOtpMode] = useState(true);
    const [newPassword, setNewPassword] = useState("");

    // Get email from login page on component mount
    useEffect(() => {
        // Check if email is passed in location state
        const emailFromLogin = location.state?.email;
        console.log("Email from state:", emailFromLogin); // Add this for debugging

        if (!emailFromLogin) {
            // If no email is found, redirect back to login
            history.push('/');
            return;
        }
        setEmail(emailFromLogin);
    }, [location, history]);

    // Resend OTP
    const resendOTP = async () => {
        try {
            const response = await Axios.post(
                `http://localhost:${PORT_NUMBER}/api/pwd/resend-otp`,
                // { email: email },
                // { headers: { 'Content-Type': 'application/json' } }
                null,
                {
                    params: {
                        email: email,

                    }
                }
            );

            // Reset timer
            setMinutes(1);
            setSeconds(30);
            setInputValue(""); // Clear input when resending

            alert("OTP Resent Successfully!");
        } catch (error) {
            console.error("Error resending OTP:", error);
            alert("Failed to resend OTP");
        }
    };

    // Reset Password (including OTP verification)
    const resetPassword = async () => {
        try {
            const response = await Axios.post(
                `http://localhost:${PORT_NUMBER}/api/pwd/reset-password`,
                null,
                {
                    params: {
                        email: email,
                        otp: inputValue,
                        newPassword: newPassword
                    }
                }
            );

            alert("Password Reset Successful!");
            history.push('/');
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("Password Reset Failed");
        }
    };

    // Timer effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                } else {
                    setSeconds(59)
                    setMinutes(minutes - 1)
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval)
        };
    }, [minutes, seconds]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-sky-50 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-sky-800 mb-6">
                    {isOtpMode ? "OTP Verification" : "Reset Password"}
                </h2>

                {isOtpMode ? (
                    <div>
                        <div className="mb-4">
                            <input
                                placeholder="Enter OTP"
                                value={inputValue}
                                type="text"
                                onChange={({ target }) => {
                                    setInputValue(target.value)
                                }}
                                className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sky-700">
                                Time Remaining:{" "}
                                <span className="font-semibold">
                                    {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </span>
                            </p>

                            <button
                                disabled={seconds > 0 || minutes > 0}
                                onClick={resendOTP}
                                className={`px-4 py-2 rounded-md transition-colors duration-300 ${seconds > 0 || minutes > 0
                                    ? "bg-sky-200 text-sky-400 cursor-not-allowed"
                                    : "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800"
                                    }`}
                            >
                                Resend OTP
                            </button>
                        </div>

                        <button
                            onClick={() => setIsOtpMode(false)}
                            disabled={inputValue.length === 0}
                            className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 disabled:bg-sky-300 disabled:cursor-not-allowed"
                        >
                            SUBMIT OTP
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4">
                            <input
                                placeholder="Enter New Password"
                                value={newPassword}
                                type="password"
                                onChange={({ target }) => {
                                    setNewPassword(target.value)
                                    console.log(inputValue)
                                }}
                                className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
                            />
                            <input
                                placeholder="OTP value"
                                value={inputValue}
                                type="password"
                                onChange={({ target }) => {
                                    setInputValue(target.value)
                                }}
                                disabled
                                className="w-full px-4 py-2 border border-sky-300 rounded-md bg-sky-100 text-sky-500 cursor-not-allowed"
                            />
                        </div>

                        <button
                            onClick={resetPassword}
                            className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                        >
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResetPassword