import React, {useState} from 'react';
import './MitsizateText.css';

// Функции для мицелизации текста
const Vowel = "аоуыэяёюие";
const Consonant = "лмнрбвгджзпфктшсхцчщ";

function mitsWord(str2) {
    if (str2.length < 6) return str2;
    str2 = str2.toLowerCase();
    const c0 = str2[0];
    const c1 = str2[1];
    const c2 = str2[2];

    if (Consonant.includes(c0) && Consonant.includes(c2) && Vowel.includes(c1)) {
        if (c0 === 'м' || c2 === 'ц') {
            return "Миц" + str2.slice(3);
        }
        if (str2.slice(2, 4) === "тс") {
            return "Миц" + str2.slice(4);
        }
    }
    return str2;
}

function mitsGeneration(str) {
    if (str.length < 6) return str;
    str = str + " ";
    let finalResult = "";
    for (let i = 0; i < str.length; i++) {
        let currentWord = "";
        let k = 0;
        const a = str[i];
        if (/[а-яА-ЯёЁ]/.test(a)) {
            for (let j = i; j < str.length; j++) {
                const b = str[j];
                if (/[а-яА-ЯёЁ]/.test(b)) {
                    currentWord += b;
                    k++;
                } else {
                    i = i + k - 1;
                    break;
                }
            }
            finalResult += mitsWord(currentWord);
        } else {
            finalResult += a;
        }
    }
    return finalResult.trim();
}

const MitsizateText = () => {
    const [inputText, setInputText] = useState('');
    const [mitseziedText, setMitseziedText] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleMitsizateClick = () => {
        const result = mitsGeneration(inputText);
        setMitseziedText(result);
        setCopySuccess(''); // Очистить статус после нового запроса
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(mitseziedText).then(() => {
            setCopySuccess('Скопировано!');
            setTimeout(() => setCopySuccess(''), 2000); // Убираем статус через 2 секунды
        }, () => {
            setCopySuccess('Не удалось скопировать');
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
                Мицелизировать
            </button>

            <label className="mitsizate-label">
                Мицелизированный текст:
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
