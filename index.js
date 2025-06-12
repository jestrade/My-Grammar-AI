document.getElementById("button").addEventListener("click", () => {
  const text = document.getElementById("input-prompt").value;
  chrome.runtime.sendMessage({ type: "improve", text }, (response) => {
    document.getElementById("response").innerText = response.improved || "Error";
  });
});

