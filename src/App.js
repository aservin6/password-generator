import { useState } from "react";
import "./App.css";
import {
  uppercaseLetters,
  lowercaseLetters,
  numbers,
  symbols,
} from "./characters";
import ErrorMessage from "./ErrorMessage";

const App = () => {
  // States
  let [passwordLength, setPasswordLength] = useState(15);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Generate Password
  const generatePasswordHandler = (e) => {
    // Prevent page reload
    e.preventDefault();
    // Set error to null so ErrorMessage disappears when password is successfully generated 
    setError(null);
    // If no boxes are checked, Error is set to string and returned
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      setError("Make sure at least 1 box is checked");
      return;
    }
    // If password length input is < 0 or > 64 Error is set to string and returned
    if (passwordLength <= 0 || passwordLength > 64) {
      setError("Enter a valid number for 'Password Length' (min: 1, max: 64)");
      return;
    } else {
      let characterList = "";
      // If boxes are checked add corresponding character list to existing 'characterList'
      if (includeUppercase) {
        characterList = characterList + uppercaseLetters;
      }
      if (includeLowercase) {
        characterList = characterList + lowercaseLetters;
      }
      if (includeNumbers) {
        characterList = characterList + numbers;
      }
      if (includeSymbols) {
        characterList = characterList + symbols;
      }
      // Passwored is set to output of createPassword function, passing in characterList
      setPassword(createPassword(characterList));
    }
  };

  // Function to generate password based on characterList
  const createPassword = (characterList) => {
    let createdPassword = ""
    // Loops through characterList based on user inputted passwordLength
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterList.length);
      // Adds random character to createdPassword
      createdPassword = createdPassword + characterList.charAt(characterIndex);
    }
    return createdPassword;
  };

  // Copys generated password to users clipboard
  const copyPassword = (password) => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="app">
      {/* If there is an error, ErrorMessage is rendered */}
      {error && <ErrorMessage error={error} />}
      <div className="password-generator">
        <div className="password-container">
          <div className="password">
            <p>{password}</p>
          </div>
          <button
            className="password-copy-btn"
            onClick={() => {
              copyPassword(password);
            }}
          >
            <i className="fa-solid fa-copy fa-lg"></i>
          </button>
        </div>
        <form className="password-form">
          <div>
            <label htmlFor="password-length">Password Length</label>
            <input
              className="number-input"
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
              defaultValue={passwordLength}
              value={passwordLength}
              type="number"
              name="password-length"
              id=""
              max={64}
            />
          </div>
          <div>
            <label htmlFor="include-uppercase">Include Uppercase Letters</label>
            <input
              onChange={(e) => {
                setIncludeUppercase(e.target.checked);
              }}
              type="checkbox"
              name="include-uppercase"
              id=""
            />
          </div>
          <div>
            <label htmlFor="include-lowercase">Include Lowercase Letters</label>
            <input
              onChange={(e) => {
                setIncludeLowercase(e.target.checked);
              }}
              type="checkbox"
              name="include-lowercase"
              id=""
            />
          </div>
          <div>
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              onChange={(e) => {
                setIncludeNumbers(e.target.checked);
              }}
              type="checkbox"
              name="include-numbers"
              id=""
            />
          </div>
          <div>
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              onChange={(e) => {
                setIncludeSymbols(e.target.checked);
              }}
              type="checkbox"
              name="include-symbols"
              id=""
            />
          </div>
          <button
            className="generate-password-btn"
            onClick={generatePasswordHandler}
            type="submit"
          >
            Generate Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
