chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url && /^https?:\/\/(?:www\.)?asuracomic\.net\//.test(changeInfo.url)){
        chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['content.js']
        });
    }
  });

//   chrome.storage.onChanged.addListener((changes, namespace) => {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//       console.log(
//         `Storage key "${key}" in namespace "${namespace}" changed.`,
//         `Old value was "${oldValue}", new value is "${newValue}".`
//       );
//     }
//   });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.reason === 'update history') {
        chrome.storage.local.set({ [message.comic]: message.chapter }, () => {
            console.log("Saved:", message.comic, "=", message.chapter);
            sendResponse(`${message.comic}: ${message.chapter}`);
          });

        return true;
    }
    else if (message.reason === "get history"){
        chrome.storage.local.get([message.comic], result => sendResponse(result[message.comic]))
        return true;
    }
});

// chrome.runtime.onInstalled.addListener((reason)=>{
//     if (reason == "install"){
//         chrome.storage.local.set({history:{}})
//     }
// })