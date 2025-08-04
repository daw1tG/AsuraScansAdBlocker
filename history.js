function injectHistory(chapterNum, comic){
    let targets = [];
    let target;
    document.querySelectorAll("h3").forEach(h3 =>{
        if(h3.textContent === "New Chapter" || h3.textContent.match(/S[0-9]/))
        {
            targets.push(h3) // there are multiple h3's that match regex if there are multiple seasons in the comic
        }
    })
    // grab correct h3
    target = targets[0]
    target.textContent = "Last Read"

    let div = target.parentNode
    let num = div.querySelector("span")
    num.textContent = chapterNum
    
    let a = div.parentNode
    a.href = `${comic}/chapter/${chapterNum}`
}

function readingHistory(){
    const message = {}
    const pathname = window.location.pathname
    let parts = pathname.split("/")
    if (parts.length == 3){
        message.reason = "get history"
        const [,,comic] = parts
        message.comic = comic

        const chapter = localStorage.getItem([message.comic])
        if (chapter){
            injectHistory(chapter, comic)
        }

        // chrome.runtime.sendMessage(message, (response)=>{
        //     console.log("history retrieved", response);
        //     if (response){
        //         injectHistory(response)
        //     }
        // })
        
    }
    if (parts.length == 5){
        message.reason = "update history"
        const [,,comic,,chapter] = parts
        message.comic = comic
        message.chapter = chapter

        localStorage.setItem(message.comic, message.chapter)

        // chrome.runtime.sendMessage(message, (response)=>{
        //     console.log("chapter updated", response);
        // })
    }
}

window.addEventListener("load", () => readingHistory())