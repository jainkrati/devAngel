import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import PropTypes from 'prop-types';
import { useState } from 'react';
const styles = {
    alignItems: 'center',
    display: 'flex'
};

const ReviewQuestionWithStar = ({ id, question, maxRating = 5, topics, ratingChanged }) => {
    const [rating, setRating] = useState({
        topics: Object.assign([], topics),
        rating: topics ? undefined : 0, // denotes rating for that question/topic
        type: topics ? 'topic' : 'question', // can be 'topic' | 'question'
        question: question // here we pass the question value itself
    });

    const arrangeTopic = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };
    const topicRatingChanged = (id, changedTopic, newRating) => {
        const newTopics = rating.topics.map((topic) => {
            if (topic.name === changedTopic.name) {
                topic.rating = newRating;
                return topic;
            }
            return topic;
        });
        setRating({ ...rating, topics: newTopics });
        ratingChanged({ id: id, type: 'topic', question: changedTopic.name, rating: newRating });
    };
    return (
        <Box m={2}>
            <Typography variant="subtitle1">
                {id + 1}. {question}
            </Typography>
            {topics && topics.length ? (
                <Stack direction="row" flexWrap="wrap" useFlexGap={true} spacing={{ xs: 1, sm: 2 }} sx={{ ml: '0.5em', mt: '0.5em' }}>
                    {topics.map((topic, index) => (
                        <div key={index} style={arrangeTopic}>
                            <Chip label={topic.name} sx={[{ backgroundColor: 'black', color: 'white' }]} />
                            <div style={styles}>
                                <Rating
                                    size="small"
                                    value={topic.rating}
                                    max={maxRating}
                                    onChange={(event, value) => {
                                        if (!value) return;
                                        topicRatingChanged(id, topic, value);
                                    }}
                                ></Rating>
                                &nbsp;
                                <Typography sx={{ fontSize: '10px' }}>
                                    {topic.rating}/{maxRating}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </Stack>
            ) : (
                <Stack direction="row" sx={{ alignItems: 'center', ml: '0.5em' }}>
                    <Rating
                        max={maxRating}
                        value={rating.rating}
                        onChange={(event, newValue) => {
                            if (!newValue) return;
                            setRating({ rating: newValue, type: 'question', question: question });
                            ratingChanged({ id: id, type: 'question', question: question, rating: newValue });
                        }}
                    />
                    &nbsp;
                    <Typography sx={{ fontSize: '10px' }}>
                        {rating.rating}/{maxRating}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
};

ReviewQuestionWithStar.propTypes = {
    question: PropTypes.string,
    maxRating: PropTypes.number,
    topics: PropTypes.array,
    ratingChanged: PropTypes.func
};

export default ReviewQuestionWithStar;
