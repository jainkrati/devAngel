import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const DevAutocomplete = ({ placeholder, getSuggestions }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const loading = open && query.length > 2;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        if (query.length > 2) {
            (async () => {
                const searchResults = await getSuggestions(query); //use API call here
                if (active) {
                    if (options.length || searchResults.length) {
                        // const options = [];
                        // searchResults.forEach((result) => options.push(result.title));
                        setOptions(searchResults);
                    }
                }
            })();
        }

        return () => {
            active = false;
        };
    }, [loading, query]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="apibased"
            onChange={(event, newValue) => {
                setSelectedValue(newValue);
            }}
            onInputChange={($event) => {
                setOptions([]);
                setQuery($event.target.value);
            }}
            sx={{ width: 'auto' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.title ?? ''}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={placeholder}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
};

DevAutocomplete.propTypes = {
    getSuggestions: PropTypes.func
};

export default DevAutocomplete;
