import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container } from '../../node_modules/@mui/material/index';
import hooks from '../hooks';

const ScrollableCards = ({ data }) => {
    const [offset, setOffset] = useState(1);
    const keySizes = hooks.useScreenSize();

    // return the cards to be shown, max is 3
    const getVisibleCards = (data) => {
        const maxCards = (keySizes[1] && 1) || (keySizes[2] && 2) || (keySizes[3] && 3) || 3;
        if (!data.length) {
            return [];
        } else if (data.length <= maxCards) {
            return data;
        } else {
            return data.filter((card, index) => {
                return index < maxCards;
            });
        }
    };

    let visibleCards = getVisibleCards(data);

    const loadNewCards = (value) => {
        if (value == 'next') {
        } else {
        }
    };

    return (
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="previous 3 cards" value="previous" onClick={(e) => loadNewCards(e.target.value)}>
                <ArrowBackIosIcon />
            </IconButton>
            <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                direction="row"
                wrap="nowrap"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {visibleCards.length > 0 ? (
                    visibleCards.map((item, index) => (
                        <Grid item key={index}>
                            <Card>
                                <CardMedia component="video" alt="green iguana" height="140" src={item.url} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.text}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.text}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <></>
                )}
            </Grid>
            <IconButton aria-label="next 3 cards" value="next" onClick={(e) => loadNewCards(e.target.value)}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Container>
    );
};

ScrollableCards.propTypes = {
    data: PropTypes.array
};

export default ScrollableCards;
