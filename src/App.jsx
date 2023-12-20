import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
    let [length, setLength] = useState(8);
    let [numberAllowed, setNumberAllowed] = useState(false);
    let [characterAllowed, setCharacterAllowed] = useState(false);
    let [password, setPassword] = useState('');

    let generatePassword = useCallback(() => {
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if (numberAllowed) {
            str += '0123456789';
        }

        if (characterAllowed) {
            str += `[]{}-_=+()!@#$%^&*~;:""''<>/?,.`;
        }

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numberAllowed, characterAllowed, setPassword]);

    useEffect(() => {
        generatePassword()        
    }, [length, setNumberAllowed, setCharacterAllowed, generatePassword])

    // all the functions of the copy button
    let passwordRef = useRef(null)

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select()
        passwordRef.current.setSelectionRange(0, 60)
        window.navigator.clipboard.writeText(password)
    }, [password])

    return (
        <>
            <div className="mainContainer">
                <h1>Password Generator</h1>

                <div className="passwordContainer">
                    <input
                        type="text"
                        value={password}
                        placeholder="Password"
                        className="passwordInput"
                        ref={passwordRef}
                        readOnly
                    />

                    <button className="copyBtn" onClick={copyPasswordToClipboard}>Copy</button>
                </div>

                <div className="passwordController">
                    <div className="lengthController">
                        <input
                            type="range"
                            className="passwordRange"
                            min={8}
                            max={60}
                            value={length}
                            onChange={(e) => {
                                setLength(Number(e.target.value));
                            }}
                        />
                        <label>Length: {length}</label>
                    </div>

                    <div className="numberAllowedController">
                        <input
                            type="checkbox"
                            className="numberAllowed"
                            checked={numberAllowed}
                            onChange={() => setNumberAllowed((prev) => !prev)}
                        />
                        <label>Number Allowed</label>
                    </div>

                    <div className="characterAllowedController">
                        <input
                            type="checkbox"
                            className="characterAllowed"
                            checked={characterAllowed}
                            onChange={() => setCharacterAllowed((prev) => !prev)}
                        />
                        <label>Character Allowed</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
