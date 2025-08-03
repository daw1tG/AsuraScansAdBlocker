chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url && /^https?:\/\/(?:www\.)?asuracomic\.net\//.test(changeInfo.url)){
        chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['content.js']
        });
    }
  });

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.reason === 'update history') {
        const history = chrome.storage.local.get(["history"])
        if (history){
            history[message.comic] = message.chapter
            chrome.storage.local.set(history)
        }
        sendResponse();
    }
    else if (message.reason === "get history"){
        chrome.storage.local
        sendResponse()
    }
});

chrome.runtime.onInstalled.addListener((reason)=>{
    if (reason == "install"){
        chrome.storage.local.set({history:{}})
    }
})