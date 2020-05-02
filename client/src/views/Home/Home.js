import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import * as puzzleSolver from "../../puzzleSolver.js"
import {findNextGuess} from "../../puzzleSolver";
//import './Home.css';

const ArrayButton = (props) =>
{
    const submit = () =>
    {
        props.submit(props.index);
    };
    return <button disabled = {props.disabled} type = "button" onClick={submit}>Submit</button>
};

const Home = () => {
    const [words, setWords] = useState(["","","","","","","","","","","",""]);
    const [nextGuess, setNextGuess] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [likenesses, setLikenesses] = useState([0, 0, 0, 0]);
    const [likenessSubmitted, setLikenessSubmitted] = useState([false, false, false, false]);
    const [password, setPassword] = useState("");
    const findCommonWord = () =>
    {
        const commonWord = words[puzzleSolver.findHighestShareScore(puzzleSolver.findShareScores(words))]
        console.log(commonWord);
        setNextGuess(commonWord);
        const newGuesses = [...guesses];
        newGuesses.push(commonWord);
        setGuesses(newGuesses);
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
    const updateLikenesses = (newValue, index) =>
    {
        const newLikenesses = likenesses.map((item, i) => {
            //loop through newWords and update only the word that is being edited
            if (i === index)
            {
                return parseInt(newValue);
            }
            else
            {
                return likenesses[i];
            }
        });
        setLikenesses(newLikenesses);
    };
    const submitLikeness = (index) =>
    {
        const newLikenessSubmitted = [...likenessSubmitted];
        newLikenessSubmitted[index] = true;
        setLikenessSubmitted(newLikenessSubmitted);
        const nextGuesses = findNextGuess(guesses, likenesses, words);
        if (nextGuesses.length === 1)
        {
            //only one guess left so it must be the password
            //password found = true
            setPassword(nextGuesses[0]);
            return;
        }
        const nextGuess = nextGuesses[0];
        const newGuesses = [...guesses];
        newGuesses.push(nextGuess);
        setGuesses(newGuesses);
    };
    return (
        <div className="App">
            <div>{password ? <h1>{"Password found! It's " + password}</h1> : null}</div>
            {words.map((item, index) =>
            (
                //allows each WordInput component to have an index
                <form>
                    {"Word " + (index+1)}
                    <label>
                        <WordInput updateWord = {updateWords} index = {index} />
                    </label>
                </form>
            ))}
            <button onClick={findCommonWord}>Find Share Scores</button>
            <div>
                {guesses.map((item, index) =>
                    (
                        //allows each WordInput component to have an index
                        <form>
                            {guesses[index] + " Likeness: "}
                            <label>
                                <WordInput disabled = {likenessSubmitted[index]} updateWord = {updateLikenesses} index = {index} />
                            </label>
                            <ArrayButton disabled = {likenessSubmitted[index]} submit = {submitLikeness} index = {index}/>
                        </form>
                    ))}
            </div>
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
    return <input disabled = {props.disabled} onChange = {updateWord} type = "text"/>
};

export default Home;
