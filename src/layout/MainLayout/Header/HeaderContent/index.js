// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import MobileSection from './MobileSection';
import Profile from './Profile';
import Search from './Search';

// ==============================|| HEADER - CONTENT ||============================== //
import { Chat } from '@pushprotocol/uiweb';
import Utils from 'utils/utils';

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            {/* <Notification /> */}
            <Chat
                account={Utils.getMyAddress()} //user address
                supportAddress="0x2C0a5B16b9C51ac466ee50baF95b6176Fb9f2b36" //support address
                apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                env="staging"
            />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
