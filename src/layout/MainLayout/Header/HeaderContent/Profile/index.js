import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// material-ui
import { Box, ButtonBase, CardContent, ClickAwayListener, Grid, Paper, Popper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

import Modal from '@mui/material/Modal';
// assets
import { useNavigate } from 'react-router-dom';
import Utils from 'utils/utils';
import { getOrCreateUser } from '../../../../../api/firestore-utils';
// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const Profile = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const handleLogout = async () => {
        if (window.ethereum) {
            if (address === null) {
                window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
                    accountChangeHandler(res[0]);
                });
            } else {
                setAddress(null);
                Utils.setMyAddress(null);
                window.location.reload();
            }
        } else {
            alert('install metamask extension!!');
        }
    };

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState(Utils.getMyAddress());
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    async function queryUserDetails(userAddress) {
        return getOrCreateUser(userAddress);
    }
    const [openModal, setOpenModal] = useState(false);
    const [userCreateTx, setUserCreateTx] = useState(null);

    const accountChangeHandler = async (account) => {
        setAddress(account);
        Utils.setMyAddress(account);
        console.log('hello' + account);

        queryUserDetails(account).then((response) => {
            let userDetails = response;
            if (!userDetails || !userDetails.name) {
                console.log('New user signup');
                const newname = prompt('New user signup, Please provide your name');
                console.log(newname);
                if (!newname) window.location.reload();
                setOpenModal(true);
                Utils.createUser(newname, setUserCreateTx, () => {
                    setOpenModal(false);
                    navigate('/profile');
                });
            } else {
                navigate('/profile');
            }
        });
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.300';
    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <Modal open={openModal}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Creating User
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {userCreateTx}
                    </Typography>
                </Box>
            </Modal>

            <ButtonBase
                sx={
                    theme.palette.mode === 'light'
                        ? {
                              p: 0.25,
                              bgcolor: open ? iconBackColorOpen : 'transparent',
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'secondary.lighter' }
                          }
                        : {
                              bgcolor: 'background.secondary',
                              color: 'text.secondary',
                              '&:hover': { bgcolor: '#25282c' }
                          }
                }
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleLogout}
            >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                    {address === null ? (
                        <Typography variant="subtitle1">Connect Wallet</Typography>
                    ) : (
                        <Typography variant="subtitle1">Disconnect Wallet</Typography>
                    )}
                </Stack>
            </ButtonBase>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (
                            <Paper
                                sx={{
                                    width: 290,
                                    minWidth: 240,
                                    maxWidth: 290,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 250
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ px: 2.5, pt: 3 }}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Grid item>
                                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                                        <Typography variant="body2" color="textSecondary">
                                                            {address}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        {open && (
                                            <>
                                                <TabPanel value={value} index={0} dir={theme.direction}>
                                                    <ProfileTab handleLogout={handleLogout} />
                                                </TabPanel>
                                                <TabPanel value={value} index={1} dir={theme.direction}>
                                                    <SettingTab />
                                                </TabPanel>
                                            </>
                                        )}
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Profile;
