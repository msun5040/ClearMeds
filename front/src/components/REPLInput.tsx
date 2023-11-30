import "../styles/main.css";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { ControlledInput } from "./ControlledInput";


// This interface contains the history (a list of 2D Arrays)
// and a setHistory function
interface REPLInputProps {
  history: string[][][];
  setHistory: Dispatch<SetStateAction<string[][][]>>;
}

// Class that handles when text input is sent to the server.
export function REPLInput(props: REPLInputProps) {
  //manage focus - prevents keyevents when on the input bar
  let input = useRef<HTMLInputElement>(null);
  let [commandString, setCommandString] = useState<string>("");
  const [keyPressed, setKeyPressed] = useState<string | null>(null);

  // This function is triggered when the button is clicked to handle whatever
  // command is sent.

  async function handleSubmit(commandString: string) {
    let command: string[] | null = commandString.match(/\[.*?\]|\S+/g);
    //check that input is not "empty"
    if (command != null) {
      command = command.map((string) => string.replace(/[\[\]]/g, ""));
      console.log("command:", command);
    }
  }

  // This function adds a response to history. If the mode is true the response
  // will be added in verbose output, if false in brief.
  function addOutput(commandString: string, output: string[][]) {
      props.setHistory((prevHistory) => [
        ...prevHistory,
        [["Command: " + commandString]],
        [["Output: "]],
        output,
      ]);
  }

  

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
          onKeyEnter={() => handleSubmit(commandString)}
          input={input}
        />
      </fieldset>
      <button className="button" onClick={() => handleSubmit(commandString)}>
        Submit
      </button>
    </div>
  );
}
