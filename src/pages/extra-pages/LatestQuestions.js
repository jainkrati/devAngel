// material-ui
// project import
import { getLatestQuestions } from 'api/firestore-utils';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import QuestionsTable from './QuestionsTable';

// ==============================|| SAMPLE PAGE ||============================== //

const LatestQuestions = () => {
    const [latestQuestions, setLatestQuestions] = useState([]);
    const [fetchState, setFetchState] = useState(false);

    async function getUserQuestions() {
        try {
            const response = await getLatestQuestions();
            if (response) {
                setFetchState(true);
                setLatestQuestions(response);
            }
        } catch (error) {
            console.error(error);
        }
    }
    if (!fetchState) {
        getUserQuestions();
    }

    return (
        <MainCard>
            <QuestionsTable items={latestQuestions} />
        </MainCard>
    );
};

export default LatestQuestions;
