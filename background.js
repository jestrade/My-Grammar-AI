chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  console.log("msg", msg);
  rewrite(msg, sendResponse);
  return true;
});

const rewrite = async (msg, sendResponse) => {
  console.log("rewrite", msg);
  if (msg.type === "improve" && 'Rewriter' in self) {
    console.log("Rewriter available");
    const options = {
      sharedContext: msg.text,
      tone: msg.tone,
      format: msg.format,
      length: msg.length,
    };

    try {
      const available = await Rewriter.availability();
      console.log("available", available);
      if (available === 'unavailable') {
        sendResponse({ response: 'Rewriter unavailable' });
        return;
      }

      const rewriter = await Rewriter.create(options);

      if (available !== 'available') {
        rewriter.addEventListener('downloadprogress', (e) => {
          console.log(e.loaded, e.total);
        });
      }

      const result = await rewriter.rewrite(msg.text);
      console.log("result", result);
      sendResponse({ response: result });
    } catch (error) {
      console.error("Rewriter error:", error);
      sendResponse({ response: 'Failed to rewrite text' });
    }
  }
};
