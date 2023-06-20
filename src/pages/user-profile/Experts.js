// project import
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { MessageOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Utils from 'utils/utils';

import { Avatar, Grid } from '../../../node_modules/@mui/material/index';

// ==============================|| SAMPLE PAGE ||============================== //

const tags = ['Polygon', 'Huddle01'];

const Experts = () => {
    const userId = Utils.getMyAddress();
    const [expertsList, setExpertsList] = useState([]);
    const [fetchState, setFetchState] = useState(false);
    async function getExperts() {
        try {
            const response = await axios.post(Utils.graphAPI, {
                query: `{
                    userUpdateds(first: 50) {
                        id
                        userAddress
                        name
                        pictureCID
                        rating
                        reputation
                    }
                }`
            });
            setExpertsList(response.data.data.userUpdateds);
            setFetchState(true);
        } catch (error) {
            console.error(error);
        }
    }
    if (!fetchState) getExperts();

    const navigate = useNavigate();
    return (
        <Grid container spacing={2}>
            {expertsList.map((expert, index) => {
                if (userId === expert.userAddress) return <></>;
                return (
                    <Grid item key={expert.id + index}>
                        <Card sx={{ maxWidth: 300, minWidth: 300 }} style={{ flex: 1 }}>
                            <CardHeader
                                style={{ cursor: 'pointer' }}
                                avatar={
                                    <Avatar src={expert.pictureCID} aria-label="profile">
                                        {expert.name[0]}
                                    </Avatar>
                                }
                                title={
                                    <Typography gutterBottom variant="h4" component="div" mb="-3px">
                                        {expert.name}
                                    </Typography>
                                }
                                subheader={`Reputation: ${expert.reputation}`}
                                onClick={() => navigate(`/profile/${expert.userAddress}`)}
                            />
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => navigate(`/connect/${expert.userAddress}`)}
                                    startIcon={<MessageOutlined />}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Chat
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Experts;
