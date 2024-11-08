import { useState } from "react";
import { useEffect } from "react";
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

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

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

  return (
    <div className="flex gap-4 px-4 py-3 flex-col items-center border-transparent">
      <h1 className="text-2xl font-bold">Webpage Colorizer 🩵</h1>
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
