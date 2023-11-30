import '../styles/main.css';
import { Dispatch, SetStateAction } from "react";

// This is an interface of state variables for the submission box and button
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  onKeyEnter: () => void;
  input: React.RefObject<HTMLInputElement>;
}
  
  // This creates the text box and button used for submission
  export function ControlledInput({value, setValue, ariaLabel, onKeyEnter, input}: ControlledInputProps ) {
    return (
      <input
        type="text"
        className="repl-command-box"
        value={value}
        placeholder="Enter command here!"
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
        aria-description="Input box where commands are placed"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onKeyEnter();
          }
        }}
        ref={input}
      ></input>
    );
  }