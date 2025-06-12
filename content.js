document.addEventListener("mouseup", async () => {
  const selection = window.getSelection().toString().trim();
  // if (selection) {
  //   chrome.runtime.sendMessage({ type: "improve", text: selection }, (response) => {
  //     if (response && response.improved) {
  //       alert(`Paraphrase this:\n\n${response.improved} and get advanced grammar recommendations`);
  //     }
  //   });
  // }
});

