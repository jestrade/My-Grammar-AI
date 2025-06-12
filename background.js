chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  rewrite(msg, sendResponse);
  return true;
});

const rewrite = async (msg, sendResponse) => {
  if (msg.type === "improve" && 'Rewriter' in self) {
    const options = {
      sharedContext: msg.text,
      tone: msg.tone,
      format: msg.format,
      length: msg.length,
    };

    try {
      const available = await Rewriter.availability();
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
      sendResponse({ response: result });
    } catch (error) {
      sendResponse({ response: 'Failed to rewrite text' });
    }
  }
};
