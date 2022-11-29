import React from "react";

const Header = (props) => {
    return (
        <header className="main-header">
            {props.label}
        </header>
    )
}
export default Header;