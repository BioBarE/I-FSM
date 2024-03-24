import React, {FC, InputHTMLAttributes} from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}

const Input: FC<InputProps> = ({...rest}) => {
    return (<input {...rest}/>)
}

export default Input;