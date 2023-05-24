import ScrollableCards from 'components/ScrollableCards';
import DevAutocomplete from '../../components/DevAutocomplete';
import MainCard from '../../components/MainCard';
const placeholder = 'Search for tags or keywords in previously answered questions (min 3 characters required), use the';

const LQData = [
    { url: '', text: '1' },
    { url: '', text: '2' },
    { url: '', text: '3' },
    { url: '', text: '4' },
    { url: '', text: '5' },
    { url: '', text: '6' }
];
const SolvedQuestions = () => {
    const getSuggestions = (query) => {
        console.log(query);
        return new Promise((resolve) => {
            const values = [
                { title: 'The Shawshank Redemption', year: 1994 },
                { title: 'The Godfather', year: 1972 }
            ];
            setTimeout(resolve(values), 2000);
        });
    };

    return (
        <MainCard>
            <DevAutocomplete placeholder={placeholder} getSuggestions={getSuggestions}></DevAutocomplete>
            <br />
            <h4>Latest Questions</h4>
            <ScrollableCards data={LQData}></ScrollableCards>
            <br />
            <h4>Popular Videos</h4>
            {/* <ScrollableCards data={LQData}></ScrollableCards> */}
        </MainCard>
    );
};

export default SolvedQuestions;
