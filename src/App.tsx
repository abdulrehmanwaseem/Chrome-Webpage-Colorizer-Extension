import { useState } from "react";

function App() {
  const [color, setColor] = useState("");

  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id !== undefined) {
      chrome.scripting.executeScript<string[], void>({
        target: { tabId: tab.id },
        args: [color],
        func: (color) => {
          document.body.style.backgroundColor = color;
        },
      });
    } else {
      console.error("Active tab or tab ID not found.");
      return <p className="text-error">Active tab or tab ID not found.</p>;
    }
  };

  return (
    <>
      <input
        type="color"
        onChange={(e) => setColor(e.currentTarget.value)}
        value={color}
      />
      <button onClick={onClick}>Change color</button>
    </>
  );
}

export default App;
