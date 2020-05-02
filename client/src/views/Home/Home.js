import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import * as puzzleSolver from "../../puzzleSolver.js"
//import './Home.css';


const Home = () => {
    const [words, setWords] = useState(["","","",""]);
    const findCommonWord = () =>
    {
        console.log(words[puzzleSolver.findHighestShareScore(puzzleSolver.findShareScores(words))]);
    };
    //main function that handles the entered words changing
    const updateWords = (newValue, index) =>
    {
        const newWords = words.map((item, i) => {
        //loop through newWords and update only the word that is being edited
        if (i === index)
        {
            return newValue;
        }
        else
        {
            return words[i];
        }
    });
        setWords(newWords);
    };
    return (
        <div className="App">
            {words.map((item, index) =>
            (
                //allows each WordInput component to have an index
                <form>
                    {"Word " + (index+1)}
                    <label>
                        <WordInput updateWord = {updateWords} index = {index} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            ))}
            <button onClick={findCommonWord}>Find Share Scores</button>
        </div>
    );
};

const WordInput = (props) =>
{
    const updateWord = (e) =>
    {
        //update the word's state using the text entered and its index
        props.updateWord(e.target.value, props.index);
    };
    return <input onChange = {updateWord} type = "text"/>
};

export default Home;
