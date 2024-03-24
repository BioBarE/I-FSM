import React, { FC } from 'react';
import { FormControlLabel, Checkbox as MUICheckbox} from '@mui/material';

interface StyledCheckboxProps {
    label: string,
    checked: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: FC<StyledCheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <FormControlLabel
            control={
                <MUICheckbox
                    checked={checked}
                    onChange={onChange}
                    sx={{
                        color: '#315cfd', // Color of the checkbox
                        '&.Mui-checked': {
                            color: '#315cfd', // Color of the checked checkbox
                        },
                    }}
                />
            }
            label={label}
            sx={{
                '& .MuiTypography-root': {
                    color: '#bdbdbd', // Color of the label
                },
            }}
        />
    );
}

export default Checkbox;
