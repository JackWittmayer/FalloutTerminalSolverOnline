import React, {useState} from 'react';
import * as puzzleSolver from "../../puzzleSolver.js"
import {findNextGuess} from "../../puzzleSolver";
import Grid from '@material-ui/core/Grid';
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
    const [words, setWords] = useState(["","","",""]);
    const [guesses, setGuesses] = useState([]);
    const [likenesses, setLikenesses] = useState([0, 0, 0, 0]);
    const [likenessSubmitted, setLikenessSubmitted] = useState([false, false, false, false]);
    const [password, setPassword] = useState("");

    //all words should be the same length so keep track of this length and show errors for words that don't match it
    const [wordLength, setWordLength] = useState(0);

    //don't show word length error while typing word so keep track of what word is being edited
    const [isBeingEdited, setIsBeingEdited] = useState([false,false,false,false]);

    const addWord = () =>
    {
        const newWords = [...words];
        newWords.push("");
        setWords(newWords);

        const newEdits = [...isBeingEdited];
        newEdits.push(false);
        setIsBeingEdited(newEdits);
    };
    const removeWord = () =>
    {
        const newWords = [...words];
        newWords.pop();
        setWords(newWords);

        const newEdits = [...isBeingEdited];
        newEdits.pop();
        setIsBeingEdited(newEdits);
    };
    const findCommonWord = () =>
    {
        const commonWord = words[puzzleSolver.findHighestShareScore(puzzleSolver.findShareScores(words))];
        console.log(commonWord);
        const newGuesses = [...guesses];
        newGuesses.push(commonWord);
        setGuesses(newGuesses);
    };
    //main function that handles the entered words changing
    const updateWords = (newValue, index) =>
    {
        //mark every word as not being edited except the one being edited
        const newEdits = [];
        for (let i = 0; i < isBeingEdited.length; i++)
            newEdits.push(false);
        newEdits[index] = true;
        setIsBeingEdited(newEdits);

        const newWords = words.map((item, i) => {
        //loop through newWords and update only the word that is being edited
        if (i === 0)
        {
            //make the word length set to the length of the first word
            setWordLength(words[i].length);
        }
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
                <Grid>
                    {"Word " + (index+1)}
                        <WordInput updateWord = {updateWords} index = {index} />
                        {!isBeingEdited[index] && words[index].length !== 0
                            && words[index].length < wordLength && index !==0 ?
                            <span>This word is shorter than the first word</span> : null}
                        {!isBeingEdited[index] && words[index].length !== 0
                            && words[index].length > wordLength && index !==0 ?
                            <span>This word is longer than the first word</span> : null}

                </Grid>
            ))}
            <Grid>
             <button onClick={findCommonWord}>Find word with most letters in common</button>
                <button onClick = {addWord}>Add word</button>
                <button onClick={removeWord}>Remove word</button>
            </Grid>
            <div>
                {guesses.map((item, index) =>
                    (
                        //allows each WordInput component to have an index
                        <form>
                            {"Click "+ guesses[index] + " and submit its likeness here:"}
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
