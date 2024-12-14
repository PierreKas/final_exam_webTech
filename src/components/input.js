import React from "react";
import "./components_style.css";
function Input({
    type = "text",
    placeholder = "",
    value,
    onChange,
    className = "",
    name = "",
    // disabled = false
}) {
    return (
        <div className="input-wrapper">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`custom-input ${className}`}
                name={name}
            // disabled={disabled}
            />
        </div>
    );
}

export default Input;