import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
    // Retrieve user information from localStorage after successful login
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Function to check if the user has access
    const hasAccess = () => {
        if (!userInfo) {
            // No user logged in, redirect to login
            return false;
        }

        // Check if the user's role is in the allowed roles
        return allowedRoles.includes(userInfo.role);
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                hasAccess() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location, message: 'You do not have permission to access this page.' }
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;