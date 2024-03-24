import React, {FC} from 'react';
import {Typography} from "@mui/material";

interface LabelProps {
    text:string;
    isError?: boolean;
}
const Label: FC<LabelProps> = ({text, isError = false}) => {
    return (<Typography sx={{color: isError ? '#ff6a85' : '#bdbdbd'}}>{text}</Typography>)
}

export default Label;