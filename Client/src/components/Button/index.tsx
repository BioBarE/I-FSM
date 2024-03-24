import React, {ButtonHTMLAttributes, FC} from 'react';
import './Button.css';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    label: string,
}

const Button: FC<ButtonProps> = ({label, ...rest}) => {
    return (<button {...rest}>{label}</button>)
}

export default Button;