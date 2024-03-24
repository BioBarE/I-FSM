import React, {FC} from 'react';
import {Button as MUIButton} from "@mui/material";

interface ButtonProps {
    label: string,
    disabled: boolean,
    onClick: () => void,
}

const Button: FC<ButtonProps> = ({label, disabled, onClick}) => {
    return (
        <MUIButton
        sx={{p:2}}
        variant="contained"
        disabled={disabled}
        onClick={onClick}>
        {label}
    </MUIButton>)
}

export default Button;