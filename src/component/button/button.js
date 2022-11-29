import React from "react";
import Button from '@mui/material/Button';

const ButtonComponent = (props) => {
    console.log("props.isDisable::", props.isDisable)
    return (
        <Button className={props.className} type={props.type} variant={props.variant ? props.variant : 'text'} startIcon={props.startIcon} onClick={props.onClick} disabled={props.isDisable}>{props.label}</Button>
    )
}

export default ButtonComponent;