import MainCard from "../../components/MainCard";
import DevAutocomplete from "../../components/DevAutocomplete";

const placeholder = "Search for tags or keywords in previously answered questions (min 3 characters required), use the";

const SolvedQuestions = () => {

  const getSuggestions =  (query) => {
    console.log(query);
    return new Promise((resolve) => {
      const values = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 }
      ];
      setTimeout(resolve(values), 2000);
    })
  }

  return (
    <MainCard>
      <DevAutocomplete placeholder={placeholder} getSuggestions={getSuggestions}></DevAutocomplete>
    </MainCard>


  );

};

export default SolvedQuestions;