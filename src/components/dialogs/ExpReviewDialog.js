import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ReviewQuestionWithStar from '../ReviewQWithStar';

const topics = [
    { name: 'Blockchain', rating: 0 },
    { name: 'Development', rating: 0 },
    { name: 'Blockchain Development', rating: 0 }
];

const reviewContent = [
    { question: 'How easy was it for you to coordinate with the expert for this call?' },
    { question: 'How well did the expert deep dive into the issue with you?' },
    { question: 'Extent to which the issue was resolved?' },
    { question: 'Rate the expert for the knowledge of', topics: topics }
];

const ExpertReviewDialog = ({ open, handleClose }) => {
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [dialogContent, setDialogContent] = useState(reviewContent);
    const [dialogType, setDialogType] = useState('review');

    let dialogTitle = '';
    let dialogText = '';

    const getContent_Actions = (type) => {
        let content;
        let actions;
        switch (type) {
            case 'review':
                dialogTitle = 'Hope your issue was resolved!';
                dialogText = 'Please take a moment to fill out the reviews and rate your expert so that we can release the funds!';
                content = (
                    <>
                        {reviewContent.map((content, index) => (
                            <ReviewQuestionWithStar
                                key={index}
                                id={index}
                                question={content.question}
                                topics={content.topics}
                                ratingChanged={onRatingChange}
                            />
                        ))}
                    </>
                );
                actions = (
                    <DialogActions>
                        <Button variant="contained" disabled={disableSubmit} onClick={handleSubmit} disableElevation>
                            Submit
                        </Button>
                    </DialogActions>
                );
                break;
            case 'payToExpert':
                dialogTitle = 'Thank you for giving your valuable feedback';
                dialogText = 'Since your problem was solved, do you want to release the funds to the expert?';
                content = <></>;
                actions = (
                    <DialogActions>
                        <Button variant="contained" onClick={handleProceed} disableElevation>
                            Proceed
                        </Button>
                        <Button onClick={handleClose} disableElevation>
                            Cancel
                        </Button>
                    </DialogActions>
                );
                break;
            case 'paySuccess':
                dialogTitle = 'Congratulations!';
                dialogText = 'Your payment was successful!';
                content = <Box>{/* <image src={celebrate} alt="party" /> */}</Box>;
                actions = <></>;
                break;
        }
        return [content, actions];
    };

    const [content, actions] = getContent_Actions(dialogType);

    function areAllRatingsSet() {
        const index = dialogContent.findIndex((content) => {
            if (content.topics) {
                return content.topics.findIndex((topic) => !topic.rating) !== -1;
            } else {
                return !content.rating;
            }
        });
        return index === -1;
    }

    function onRatingChange(data) {
        const newContent = [...dialogContent];
        if (data.type === 'topic') {
            const topicIndex = newContent[data.id].topics.findIndex((topic) => topic.name === data.question);
            newContent[data.id].topics[topicIndex].rating = data.rating;
        } else {
            newContent[data.id].rating = data.rating;
        }
        setDialogContent(newContent);
        setDisableSubmit(!areAllRatingsSet());
    }

    function handleSubmit() {
        setDialogType('payToExpert'); // after success
    }

    function handleProceed() {
        setDialogType('paySuccess'); // after success
    }

    return (
        <Dialog open={open} onClose={handleClose} br={'0.5em'}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '1.2rem' }}>
                <Typography variant="h4">{dialogTitle}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{dialogText}</Typography>
                </DialogContentText>
                {content}
            </DialogContent>
            {actions}
        </Dialog>
    );
};

export default ExpertReviewDialog;
