import React, {useEffect, useState} from 'react';
import * as tesseract from "tesseract.js";

const Demo = (props) =>
{
    const [picture, setPicture] = useState();

    useEffect(() =>
    {
        if (picture)
        {
            findText();
        }
    });

    const findText = async () =>
    {
        tesseract.recognize(
            picture,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log(text);
        })
    };

    const onDrop = (picture) =>
    {
        setPicture(picture[0]);
        console.log(picture);
    };

    return(

    );
};

export default Demo;