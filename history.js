// function injectHistory(chapterNum, comic){
//     alert("running inject history")
//     let target;

//     let chapterButtonsGroup = document.querySelector("div.grid-cols-2")
//     target = chapterButtonsGroup.childNodes[1] // latest chapter button
//     target.href = `${comic}/chapter/${chapterNum}`

//     let num = target.querySelector("span")
//     num.textContent = chapterNum

//     target.childNodes[0].childNodes[0].textContent = "Last Read"
// }

function injectHistory(chapterNum, comic){
    console.log("creating container")

    const container = document.createElement("a");
    container.id = "my-extension-ui";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.background = "#9140e3"
    container.style.color = "white"
    container.style.padding = "10px";
    container.style.zIndex = "999999";
    container.style.borderRadius = "5px"
    container.href = `${comic}/chapter/${chapterNum}`


    container.textContent = `Last Read: ${chapterNum}`;

    document.body.appendChild(container);
}
function removeUID(string){
    let parts = string.split("-")
    parts.pop()
    return parts.join("-")
}

function readingHistory(){
    const message = {}
    const pathname = window.location.pathname
    let parts = pathname.split("/")
    if (parts.length == 3){
        message.reason = "get history"
        const [,,comic] = parts
        message.comic = removeUID(comic)

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
        message.comic = removeUID(comic)
        message.chapter = chapter

        console.log(`setting item: {${message.comic}: ${message.chapter}}`)
        localStorage.setItem(message.comic, message.chapter)

        // chrome.runtime.sendMessage(message, (response)=>{
        //     console.log("chapter updated", response);
        // })
    }
}

window.addEventListener("load", () => {
    console.log("running readingHistory")
    readingHistory();
    //setTimeout(readingHistory, 1000)
}) // wait for react hydration

