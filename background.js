chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url && /^https?:\/\/(?:www\.)?asuracomic\.net\//.test(changeInfo.url)){
        chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['content.js']
        });
    }
  });
