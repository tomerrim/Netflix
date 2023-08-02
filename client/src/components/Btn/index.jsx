import "./Btn.scss";

// eslint-disable-next-line react/prop-types
export const Btn = ({type, children, className, onClick}) => {
    return (
        <button type={type || "button"} className={`button ${className}`} onClick={onClick}>{children}</button>
    )
}