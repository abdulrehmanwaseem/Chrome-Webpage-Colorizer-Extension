import { useState } from "react";
import { Sketch } from "@uiw/react-color";

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
    <div className="flex gap-4 px-4 py-3 flex-col items-center border-transparent">
      <h1 className="text-2xl font-bold">Webpage Colorizer 🩵</h1>
      <Sketch
        color={color}
        onChange={(color) => {
          setColor(color.hexa);
        }}
      />
      <div className="w-full px-6">
        <button
          onClick={onClick}
          type="button"
          className="text-md p-2 w-full font-bold text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80  rounded-lg tpx-5 py-2.5 text-center me-2 mb-2"
        >
          Change Color
        </button>
      </div>
    </div>
  );
}

export default App;
