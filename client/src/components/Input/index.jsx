/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Input.scss";

export const Input = ({ type, placeholder, name, value, className, onChange }) => {

    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPassword ? "text" : type || "text";
    const handleChange = (e) => onChange(e);

    return (
        <input 
            type={inputType}
            placeholder={placeholder}
            name={name}
            value={value}
            className={`input ${className}`}
            onChange={handleChange}/>  
    )
}