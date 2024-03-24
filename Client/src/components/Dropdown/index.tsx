import React, {FC} from 'react';
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";

const filter = createFilterOptions<{ id: string, label: string }>();

export interface DropDownProps {
    handleOnChange: (event: any, value: any) => void;
    options: { id: string, label: string }[];
    value: string | null
}

const Dropdown: FC<DropDownProps> = ({
                                         handleOnChange,
                                         options,
                                         value
                                     }) => {
    return (
        <Autocomplete
            value={value || ''}
            onChange={handleOnChange}
            disablePortal
            sx={{
                color: '#bdbdbd',
                borderRadius: '5px',
                width: 200,
                '& .MuiAutocomplete-inputRoot': {
                    color: '#bdbdbd',
                },
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
            freeSolo
            handleHomeEndKeys
            renderInput={
                (params) =>
                    <TextField
                        variant="outlined"
                        color={'primary'}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                        }}
                        label="FSM Name"/>}
            options={options}
            clearOnBlur
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const {inputValue} = params;
                const isExisting = options.some((option) => inputValue === option.label);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        id: '',
                        label: `Add ${inputValue}`,
                    });
                }

                return filtered;
            }}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.label) {
                    return option.label;
                }
                // Regular option
                return option.label;
            }}
        />);
}

export default Dropdown;