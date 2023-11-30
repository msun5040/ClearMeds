import "../styles/main.css";

export default function HelpScreen() {
  return (
    <div
      className="help-box"
      aria-label="Help box"
      aria-description="Contains the keyboard shortcuts and valid commands"
    >
      <h2>KeyBoard Shortcuts</h2>
      <p>
        <strong>m</strong> - change mode
      </p>
      <p>
        <strong>v</strong> - view file
      </p>
      <p>
        <strong>c</strong> - focus on command line bar
      </p>
      <h2>Valid Commands</h2>
      <p>
        <strong>load_file</strong> - Inputs: filepath
      </p>
      <p>
        <strong>view</strong> - Inputs: None supported
      </p>
      <p>
        <strong>search</strong> - Inputs: [1]* target [2]*+ column (index # or
        name) [3]+ file has headers (true or false)
      </p>
      <p>
        <strong>broadband</strong> - Inputs: [1] state [2] county
      </p>
      <p>
        <strong>setup_redlining</strong> - RUN THIS BEFORE ANY MAP OPERATIONS -
        Inputs: None supported
      </p>
      <p>
        <strong>bbox_search</strong> - Inputs: [1][lat-lower-bound,
        lat-upper-bound] [2] [long-lower-bound, long-upper-bound]
      </p>
      <p>
        <strong>set_mock_mode</strong> - Inputs: [1] boolean
      </p>
      <p>
        <strong>term_search</strong> - Inputs: [1] search-term
      </p>
      <p>
        <strong>clear_history</strong> - Inputs: None supported
      </p>
      <div className="notes">
        <ul>
          <strong>*</strong> Supports multiple word queries enclosed in
          brackets.
        </ul>
        <ul>
          <strong>+</strong> Optional parameter.
        </ul>
      </div>
    </div>
  );
}
