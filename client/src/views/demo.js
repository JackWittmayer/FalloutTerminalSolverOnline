import React, {useEffect, useState} from 'react';
import ImageUploader from 'react-images-upload';
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
        <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
    );
};

export default Demo;