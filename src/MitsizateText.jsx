import React, {useState} from 'react';
import axios from 'axios';
import './MitsizateText.css';

const MitsizateText = () => {
    const [inputText, setInputText] = useState('');
    const [mitseziedText, setMitseziedText] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleMitsizateClick = async () => {
        try {
            const response = await axios.post('/mitsizate', {value: inputText});
            // setMitseziedText(response.data.mitseziedValue);
            setMitseziedText('В работе');
            setCopySuccess('');
        } catch (error) {
            console.error('Пока занят', error);
        }
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(mitseziedText).then(() => {
            setCopySuccess('Сделано');
            setTimeout(() => setCopySuccess(''), 2000); // Убираем статус через 2 секунды
        }, () => {
            setCopySuccess('Пока занят');
        });
    };

    return (
        <div className="mitsizate-container">
            <h1 className="mitsizate-title">Мицелизация текста</h1>

            <label className="mitsizate-label">
                Введите текст:
                <textarea
                    className="mitsizate-input"
                    value={inputText}
                    onChange={handleInputChange}
                />
            </label>

            <button className="mitsizate-button" onClick={handleMitsizateClick}>
                Сделаешь?
            </button>

            <label className="mitsizate-label">
                Сделано:
                <textarea
                    className="mitsizate-output"
                    value={mitseziedText}
                    readOnly
                />
            </label>

            <button className="copy-button" onClick={handleCopyClick}>
                Скопировать
            </button>
            {copySuccess && <p className="copy-success">{copySuccess}</p>}
        </div>
    );
};

export default MitsizateText;
