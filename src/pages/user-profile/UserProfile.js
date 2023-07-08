// material-ui
import { Typography } from '@mui/material';
import Utils from 'utils/utils';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MessageOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';
import { Alert, Avatar, Button, CardActions, CardContent, Grid } from '../../../node_modules/@mui/material/index';

import { useNavigate } from 'react-router-dom';
import QuestionsTable from '../extra-pages/QuestionsTable';

// ==============================|| SAMPLE PAGE ||============================== //

const tags = ['Polygon', 'Huddle01'];
const UserProfile = (userAddress) => {
    let { id } = useParams();
    userAddress = id ? id : Utils.getMyAddress();

    const [userDetails, setUserDetails] = useState({});
    const [userQuestions, setUserQuestions] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (userAddress) {
            getUserDetails();
            getUserQuestions();
        }
    }, []);

    if (!Utils.getMyAddress()) {
        return (
            <MainCard sx={{ mt: 0 }}>
                <CardContent>
                    <Alert severity="error">
                        <Typography variant="h5">Connect wallet to access your profile</Typography>
                    </Alert>
                </CardContent>
            </MainCard>
        );
    }

    async function fetchUserDetails() {
        const response = await axios.post(Utils.graphAPI, {
            query: `{
                userUpdateds(where: { userAddress: "${userAddress}"}, first: 5) {
                    id
                    userAddress
                    name
                    pictureCID
                    rating
                    reputation
                }
            }`
        });
        const userDetail = response.data.data.userUpdateds[0];
        setUserDetails(response.data.data.userUpdateds[0]);
    }

    async function getUserDetails() {
        try {
            let userDetail = fetchUserDetails();
            console.log(userDetail);
            setUserDetails(userDetail);
        } catch (error) {
            console.error(error);
        }
    }

    async function getUserQuestions() {
        try {
            const response = await axios.post(Utils.graphAPI, {
                query: `{
                    questionUpdateds(where: {creator: "${userAddress}"}, first: 5) {
                        id
                        creator
                        questionId
                        title
                        description
                        bounty
                    }
                }`
            });
            setUserQuestions(response.data.data.questionUpdateds);
        } catch (error) {
            console.error(error);
        }
    }
    // if (!fetchState) {
    //     getUserDetails();
    //     getUserQuestions();
    //     setFetchState(true);
    // }

    return (
        <>
            <MainCard sx={{ mt: 0 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={0}>
                            <Avatar alt={userDetails.name} src={userDetails.pictureCID} sx={{ width: 56, height: 56 }} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="h1">{userDetails.name}</Typography>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant="h5">
                                Reputation : {userDetails.reputation} &nbsp; | &nbsp; Rating : {userDetails.rating}/10
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                {Utils.getMyAddress() !== userAddress ? (
                    <CardActions>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate(`/connect/${userDetails.userAddress}`)}
                            startIcon={<MessageOutlined />}
                            style={{ cursor: 'pointer' }}
                        >
                            Chat
                        </Button>
                    </CardActions>
                ) : (
                    <></>
                )}
            </MainCard>
            <MainCard sx={{ mt: 3 }} title={userDetails.name + "'s Questions"}>
                <QuestionsTable items={userQuestions}></QuestionsTable>
            </MainCard>
        </>
    );
};

export default UserProfile;
