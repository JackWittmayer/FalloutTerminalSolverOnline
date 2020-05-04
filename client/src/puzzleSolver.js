export const findShareScores = (words) =>
{
    //0. Create share score array
    let shareScores = [];
    for (let i = 0; i < words.length; i++)
    {
        shareScores.push(0);
    }
    //1. Compare each letter from first word with each letter from second word
    //2. Tally up each shared letter in shareScores array for first and second word
    //3. Repeat with first word and third word until first word and last word
    //4. Repeat with second word and third word and so on
    for (let leftWordIndex = 0; leftWordIndex < words.length -1; leftWordIndex++)
    {
        const leftWord = words[leftWordIndex];
        for (let rightWordIndex = leftWordIndex + 1; rightWordIndex < words.length; rightWordIndex++)
        {
            const rightWord = words[rightWordIndex];
            //make sure are word lengths are the same before comparing
            if (leftWord.length !== rightWord.length)
            {
                console.log("Error: At least one word has a missing or extra letter.");
                return "Error: At least one word has a missing or extra letter."
            }

            for (let letterIndex = 0; letterIndex < leftWord.length; letterIndex++)
            {
                if (leftWord[letterIndex].toLowerCase() === rightWord[letterIndex].toLowerCase())
                {
                    //if letters are matching, increase shareScores tally for both words
                    shareScores[leftWordIndex] += 1;
                    shareScores[rightWordIndex] +=1;
                }
            }
        }
    }
    console.log("share scores" , shareScores);
    return shareScores;
};

export const findHighestShareScore = (shareScores) =>
{
    //basic find maximum of array process
    let highestShareScore = shareScores[0];
    let wordIndex = 0;
    for (let shareScoreIndex = 1; shareScoreIndex < shareScores.length; shareScoreIndex++)
    {
        if (shareScores[shareScoreIndex] > highestShareScore) {
            highestShareScore = shareScores[shareScoreIndex];
            wordIndex = shareScoreIndex;
        }
    }
    console.log(highestShareScore);
    return wordIndex;
};

export const findNextGuess = (guesses, likenesses, words) =>
{
    const nextGuesses = [];
    //based on the likeness score of each guess, find a word that matches the likeness of each guess
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++)
    {
        let word = words[wordIndex];
        console.log("word",word);
        if (!guesses.includes(word)) {
            let validGuess = true;
            for (let i = 0; i < guesses.length; i++)
            {
                let shareScore = 0;
                for (let letterIndex = 0; letterIndex < word.length; letterIndex++)
                {
                    if (word[letterIndex].toLowerCase() === guesses[i][letterIndex].toLowerCase())
                        shareScore+=1;
                }
                if (shareScore !== likenesses[i])
                {
                    //word does not match likeness of all guesses; go to next word
                    validGuess = false;
                    break;
                }
            }

            //found word that matches likeness of all guesses
            if (validGuess)
                nextGuesses.push(word);
        }
    }
    return nextGuesses;
};