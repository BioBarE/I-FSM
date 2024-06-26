import React, { ChangeEvent, FC } from 'react';
import { TextField } from "@mui/material";

interface InputProps {
    label: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({ onChange, label, value }) => {
    return (
        <TextField
            data-testid={`text-field-input-${label}`}
            label={label}
            value={value}
            onChange={onChange}
            variant="outlined"
            sx={{
                width: '200px',
                color: '#bdbdbd',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#bdbdbd',
                    },
                    '&:hover fieldset': {
                        borderColor: '#315cfd',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#bdbdbd',
                },
            }}
            inputProps={{
                'data-testid': `input-${label}`,
                style: {
                    color: '#bdbdbd',
                },
            }}
        />
    );
}

export default Input;
