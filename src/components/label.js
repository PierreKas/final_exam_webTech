import React from "react";
import "./components_style.css";
function Label({
    text,
    htmlFor = "",
    className = ""
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={`custom-label ${className}`}
        >
            {text}
        </label>
    );
}

export default Label;