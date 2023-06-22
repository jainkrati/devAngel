import { useMediaQuery } from '@mui/material';

// returns the key of the Material UI Grid system
const useScreenSize = () => {
    return {
        1: useMediaQuery('(max-width:600px)'),
        2: useMediaQuery('(max-width:900px)'),
        3: useMediaQuery('(max-width:1200px)')
    };
};

const hooks = {
    useScreenSize
};

export default hooks;
