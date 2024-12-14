// import React, { useEffect } from 'react'
// import { useState } from 'react'

// function OTP() {
//     const [otp, setOtp] = useState("");
//     const [minutes, setMinutes] = useState(0);
//     const [seconds, setSeconds] = useState(10);

//     //resend OTP
//     const resendOTP = () => {
//         setMinutes(0);
//         setSeconds(10);
//     };
//     const handleSubmit = () => {

//     }
//     useEffect(() => {
//         const interval = setInterval(() => {

//             //Decrease seconds if greater than zero
//             if (seconds > 0) {
//                 setSeconds(seconds - 1);
//             }
//             //When seconds reach 0, decrease minute if they're greater than 0
//             if (seconds === 0) {
//                 if (minutes === 0) {
//                     // Stop the countdown when min and sec reach 0
//                     clearInterval(interval)

//                 } else {
//                     //Reset seconds to 59 and decrease minutes by 1
//                     setSeconds(59)
//                     setMinutes(minutes - 1)
//                 }

//             }

//         }, 1000);
//         return () => {
//             //Stop the interval when the component unmounts
//             clearInterval(interval)
//         };
//     }, [minutes, seconds]); //Re-run the effect whenever 'seconds' changes
//     return (
//         <div>
//             <div>
//                 <input
//                     value={otp}
//                     onChange={({ target }) => {
//                         setOtp(target.value)
//                     }}
//                 />
//             </div>
//             <div>
//                 <p>
//                     Time Remaining:{" "}

//                     <span style={{ fontWeight: 300 }}>
//                         {minutes < 10 ? `0${minutes}` : minutes}:
//                         {seconds < 10 ? `0${seconds}` : seconds}
//                     </span>
//                 </p>
//                 <button
//                     disabled={seconds > 0 || minutes > 0}
//                     style={{
//                         color: (seconds > 0 || minutes > 0) ? "#DFE3Eb" : "#FF5630",
//                         cursor: (seconds > 0 || minutes > 0) ? "not-allowed" : "pointer"
//                     }}
//                     onClick={resendOTP}
//                 >
//                     Resend the OTP
//                 </button>
//             </div>
//             <button onSubmit={handleSubmit}>SUBMIT</button>

//         </div>
//     )
// }

// export default OTP

// import React, { useEffect, useState } from 'react'
// import Axios from 'axios'
// import { useLocation, useHistory } from 'react-router-dom'
// import PORT_NUMBER from './../port_number';

// function OTP() {
//     const location = useLocation();
//     const history = useHistory();
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState("");
//     const [minutes, setMinutes] = useState(0);
//     const [seconds, setSeconds] = useState(10);

//     // Get email from login page on component mount
//     useEffect(() => {
//         const emailFromLogin = location.state?.email;
//         if (!emailFromLogin) {
//             // Redirect back to login if no email is found
//             history.push('/login');
//             return;
//         }
//         setEmail(emailFromLogin);
//     }, [location, history]);

//     // Resend OTP
//     const resendOTP = async () => {
//         try {
//             const response = await Axios.post(
//                 `http://localhost:${PORT_NUMBER}/api/users/resend-otp`,
//                 { email: email },
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             // Reset timer
//             setMinutes(1);
//             setSeconds(30);

//             alert("OTP Resent Successfully!");
//         } catch (error) {
//             console.error("Error resending OTP:", error);
//             alert("Failed to resend OTP");
//         }
//     };

//     // Submit OTP
//     const handleSubmit = async () => {
//         try {
//             const response = await Axios.post(
//                 `http://localhost:${PORT_NUMBER}/api/users/verify-otp`,
//                 null,
//                 {
//                     params: {
//                         email: email,
//                         otp: otp
//                     }
//                 }
//             );

//             alert("OTP Verification Successful!");
//             // Navigate to home page after successful verification
//             history.push('/home');
//         } catch (error) {
//             console.error("Error verifying OTP:", error);
//             alert("OTP Verification Failed");
//         }
//     };

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
//         <div>
//             <div>
//                 <input
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={({ target }) => {
//                         setOtp(target.value)
//                     }}
//                 />
//             </div>
//             <div>
//                 <p>
//                     Time Remaining:{" "}
//                     <span style={{ fontWeight: 300 }}>
//                         {minutes < 10 ? `0${minutes}` : minutes}:
//                         {seconds < 10 ? `0${seconds}` : seconds}
//                     </span>
//                 </p>
//                 <button
//                     disabled={seconds > 0 || minutes > 0}
//                     style={{
//                         color: (seconds > 0 || minutes > 0) ? "#DFE3Eb" : "#FF5630",
//                         cursor: (seconds > 0 || minutes > 0) ? "not-allowed" : "pointer"
//                     }}
//                     onClick={resendOTP}
//                 >
//                     Resend the OTP
//                 </button>
//             </div>
//             <button onClick={handleSubmit}>SUBMIT</button>
//         </div>
//     )
// }

// export default OTP

import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import PORT_NUMBER from './../port_number';

function OTP() {
    const location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const [isLoading, setIsLoading] = useState(false);

    // Get email from login page on component mount
    useEffect(() => {
        const emailFromLogin = location.state?.email;
        if (!emailFromLogin) {
            // Redirect back to login if no email is found
            history.push('/');
            return;
        }
        setEmail(emailFromLogin);
    }, [location, history]);

    // Resend OTP
    const resendOTP = async () => {
        try {
            setIsLoading(true);
            const response = await Axios.post(
                `http://localhost:${PORT_NUMBER}/api/users/resend-otp`,
                null,
                {
                    params: {
                        email: email
                    }
                }
            );

            // Reset timer
            setMinutes(1);
            setSeconds(30);
            setIsLoading(false);
            alert("OTP Resent Successfully to your email address");
        } catch (error) {
            console.error("Error resending OTP:", error);
            alert("Failed to resend OTP");
        }
    };

    // Submit OTP
    const handleSubmit = async () => {
        try {
            const response = await Axios.post(
                `http://localhost:${PORT_NUMBER}/api/users/verify-otp`,
                null,
                {
                    params: {
                        email: email,
                        otp: otp
                    }
                }
            );

            // Store user information in localStorage after successful verification
            localStorage.setItem('userInfo', JSON.stringify({
                userId: response.data.userId,
                fullName: response.data.fullName,
                email: response.data.email,
                role: response.data.role
            }));

            alert("OTP Verification Successful!");
            // Navigate to home page after successful verification
            history.push('/home');
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("OTP Verification Failed");
        }
    };

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
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-600"></div>
                    </div>
                )}
                <h2 className="text-2xl font-bold text-center text-sky-800 mb-6">OTP Verification</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={({ target }) => setOtp(target.value)}
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
                    onClick={handleSubmit}
                    className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                >
                    SUBMIT
                </button>
            </div>
        </div>
    )
}

export default OTP