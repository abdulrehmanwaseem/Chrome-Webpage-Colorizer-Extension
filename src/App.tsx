function App() {
  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.style.backgroundColor = "pink";
      },
    });
  };

  return (
    <>
      <button onClick={onClick}>Click</button>
    </>
  );
}

export default App;
