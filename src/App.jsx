import { useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(
    (len, numAllowed, charAllowed) => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (numAllowed) str += "0123456789";
      if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

      for (let i = 0; i < len; i++) {
        const char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }

      setPassword(pass);
    },
    []
  );

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-700 text-white px-3 py-0.5"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-4">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => {
            const val = Number(e.target.value);
            setLength(val);
            passwordGenerator(val, numberAllowed, charAllowed);
          }}
        />

        <input
          type="checkbox"
          checked={numberAllowed}
          onChange={() => {
            const val = !numberAllowed;
            setNumberAllowed(val);
            passwordGenerator(length, val, charAllowed);
          }}
        />
        Numbers

        <input
          type="checkbox"
          checked={charAllowed}
          onChange={() => {
            const val = !charAllowed;
            setCharAllowed(val);
            passwordGenerator(length, numberAllowed, val);
          }}
        />
        Characters
      </div>
    </div>
  );
}

export default App;
