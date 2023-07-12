import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ScrollableCards from 'components/ScrollableCards';
import { useState } from 'react';
import { getSolvedQuestions } from '../../api/firestore-utils';
import DevAutocomplete from '../../components/DevAutocomplete';
import MainCard from '../../components/MainCard';
let LQData = [
    { url: 'https://www.youtube.com/embed/QFaFIcGhPoM?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3', text: 'Intro1' },
    { url: 'https://www.youtube.com/watch?v=9hb_0TZ_MVI&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=2&pp=iAQB', text: 'Intro2' },
    { url: 'https://www.youtube.com/watch?v=9VIiLJL0H4Y&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=3&pp=iAQB', text: 'Intro3' },
    { url: 'https://www.youtube.com/watch?v=Y2hgEGPzTZY&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=4&pp=iAQB', text: 'Intro4' },
    { url: 'https://www.youtube.com/watch?v=Cla1WwguArA&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=5&pp=iAQB', text: 'Intro5' },
    { url: 'https://www.youtube.com/watch?v=lnV34uLEzis&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=6&pp=iAQB', text: 'Intro6' }
];
const SolvedQuestions = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const placeholder = 'Search for tags or keywords in previously answered questions (min 3 characters required), use the';
    const [suggestions, setSuggestions] = useState([]);
    const getSuggestions = async (query) => {
        if (query && query.trim()) {
            const words = query.split(/(\s.)/);
            if (words.length > 10) words = words.filter((word, index) => index < 11);
            const values = await getSolvedQuestions(words);
            setSuggestions(values);
            return values;
        }
        // return new Promise((resolve) => {
        //     const values = [
        //         { title: 'The Shawshank Redemption', year: 1994 },
        //         { title: 'The Godfather', year: 1972 }
        //     ];
        //     setTimeout(resolve(values), 2000);
        // });
    };

    const handleCardClick = (source, details) => {
        setSelectedCard(details);
    };

    return (
        <MainCard>
            {selectedCard ? (
                <>
                    <ArrowBackIcon sx={{ cursor: 'pointer' }} onClick={() => setSelectedCard(null)}></ArrowBackIcon>
                    <Card>
                        <CardMedia component="video" alt="green iguana" height="140" src={selectedCard?.url} controls preload="metadata" />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {selectedCard?.text}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedCard?.text}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </>
            ) : (
                <>
                    <DevAutocomplete placeholder={placeholder} getSuggestions={getSuggestions}></DevAutocomplete>
                    <br />
                    <h4>Latest Questions</h4>
                    <ScrollableCards data={LQData} handleCardClick={handleCardClick}></ScrollableCards>
                    <br />
                    <h4>Popular Videos</h4>
                    {/* <ScrollableCards data={LQData}></ScrollableCards> */}
                </>
            )}
        </MainCard>
    );
};

export default SolvedQuestions;
