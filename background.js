chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
  console.log(msg);
  if (msg.type === "improve") {

    if ('Rewriter' in self) {
      const options = {
        sharedContext: msg.text,
        tone: 'more-casual',
        format: 'plain-text',
        length: 'shorter',
      };

      const available = await Rewriter.availability();
      let rewriter;
      if (available === 'unavailable') {
        return;
      }
      if (available === 'available') {
        rewriter = await Rewriter.create(options);
      } else {
        rewriter = await Rewriter.create(options);
        rewriter.addEventListener('downloadprogress', (e) => {
          console.log(e.loaded, e.total);
        });
      }

      const result = await rewriter.rewrite(msg.text);
      sendResponse({ improved: result });
    }
  }
});

