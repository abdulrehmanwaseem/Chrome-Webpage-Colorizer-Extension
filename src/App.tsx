import { useState } from "react";
import { Sketch } from "@uiw/react-color";
// import { useEffect } from "react";

const colorOptions = [
  { hex: "#1d232aFC", name: "Charcoal" },
  { hex: "#AEC6CFCC", name: "Cool Gray" },
  { hex: "#FAF7F5CC", name: "Soft White" },
  { hex: "#345DA7", name: "Aqua" },
  { hex: "#FFDAC1CC", name: "Peach" },
  { hex: "#ECEFF4", name: "Aqua" },
  { hex: "#B2DFDBCC", name: "Mint" },
  { hex: "#A5D6A7CC", name: "Pastel Green" },
  { hex: "#D1C4E9CC", name: "Lavender" },
  { hex: "#F8BBD0CC", name: "Pink" },
  { hex: "#FFF9C4CC", name: "Lemon" },
  { hex: "#1A103D", name: "Synthwave" },
  { hex: "#FFE0B2CC", name: "Cream" },
  { hex: "#C8E6C9CC", name: "Seafoam" },
  { hex: "#E1BEE7CC", name: "Orchid" },
  { hex: "#C5E1A5CC", name: "Light Green" },
  { hex: "#F0F4C3CC", name: "Pale Yellow" },
  { hex: "#FFF5E1CC", name: "Ivory" },
  { hex: "#FFECB3CC", name: "Light Peach" },
  { hex: "#FAE7F4", name: "Valentine" },
  { hex: "#E9E7E7", name: "Gray" },
  { hex: "#212121", name: "Mate Black" },
  { hex: "#B0D0D3", name: "Mist Blue" },
  { hex: "#FFC1CC", name: "Blush Pink" },
];
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

  // For testing in dev
  // useEffect(() => {
  //   document.body.style.backgroundColor = color;
  // }, [color]);

  return (
    <div className="flex gap-3 px-4 py-3 flex-col items-center border-transparent">
      <h1 className="flex gap-2 text-2xl font-bold items-center">
        Webpage Colorizer
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/abdulrehmanwaseem", "_blank")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            className="mt-[1.5px]"
            viewBox="0 0 1792 1792"
          >
            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
          </svg>
        </button>
      </h1>
      <Sketch
        color={color}
        onChange={(color) => {
          setColor(color.hexa);
        }}
        presetColors={colorOptions.map((option) => ({
          color: option.hex,
          title: option.name,
        }))}
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
