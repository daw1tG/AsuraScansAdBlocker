function injectHistory(chapterNum){
    let target;
    document.querySelectorAll("h3").forEach(h3 =>{
        if(h3.textContent === "New Chapter"){target = h3}
    })
    target.textContent = "Last Read"

    let div = target.parentNode
    let num = div.querySelector("span")
    num.textContent = chapterNum
    
    let a = div.parentNode
    let string = a.href.split("/")
    string[string.length-1] = chapterNum
    a.href = string.join("")
}

function readingHistory(){
    const message = {}
    const result = 0;
    const pathname = window.location.pathname
    let parts = pathname.split("/")
    if (parts.length == 3){
        message.reason = "get history"
        const [,,comic] = parts
        message.comic = comic

        chrome.runtime.sendMessage(message, (response)=>{
            console.log("history retrieved", response);
            result = response;
        })
        try{
            injectHistory(result)
        } catch (err){
            console.error(err)
        }
        
    }
    if (parts.length == 5){
        message.reason = "update history"
        const [,,comic,,chapter] = parts
        message.comic = comic
        message.chapter = chapter

        chrome.runtime.sendMessage(message, (response)=>{
            console.log("chapter updated", response);
        })
    }
}

window.addEventListener("load", () => readingHistory())