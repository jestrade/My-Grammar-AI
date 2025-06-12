const copyButton = document.getElementById("copy-button");
const clearButton = document.getElementById("clear-button");

document.getElementById("button").addEventListener("click", () => {
  const text = document.getElementById("input-prompt").value;
  const tone = document.getElementById("tone").value;
  const length = document.getElementById("length").value;
  const format = document.getElementById("format").value;
  const loading = document.getElementById("loading");

  loading.hidden = false;
  chrome.runtime.sendMessage(
    { type: "improve", text, tone, length, format },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error("Message failed:", chrome.runtime.lastError);
        document.getElementById("response").innerText = "Error";
        return;
      }
      document.getElementById("response").innerText = response.response || "Error";
      loading.hidden = true;
      copyButton.hidden = false;
      clearButton.hidden = false;
    }
  );
});

clearButton.addEventListener("click", () => {
  document.getElementById("input-prompt").value = "";
  document.getElementById("response").innerText = "";
  copyButton.hidden = true;
  clearButton.hidden = true;
});

const copyText = document.getElementById("response");
const confirmation = document.getElementById("confirmation");
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(copyText.innerText).then(() => {
    confirmation.style.display = "inline";
    setTimeout(() => {
      confirmation.style.display = "none";
    }, 1500);
  }).catch(err => {
    console.error("Copy failed: ", err);
  });
});