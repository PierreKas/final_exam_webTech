
import React from "react";
import "./components_style.css";
function Button({ label }) {

    return (
        <div>
            <button type="submit">
                {label}
            </button>
        </div>
    );
}

export default Button