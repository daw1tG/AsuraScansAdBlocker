function directDelete() {
    let regex = /.+\-ads/g;
    let ads = []
    document.querySelectorAll("div").forEach((div) => { 
        if(div.id.match(regex)){
            ads.push(div)  
        }
    })
    //console.log(ads)
    for (let ad of ads){
        //console.log("removing: " + ad.outerHTML)
        ad.remove()
    }

    if (document.querySelector("body").childNodes[0].nodeName !== "HEADER"){
        document.querySelector("body").childNodes[0].remove()
    }

    document.querySelectorAll("h2").forEach((h2) => {
        let target;

        if (h2.childNodes.length === 2 && h2.childNodes[0].nodeName === "SPAN" && h2.childNodes[0].childNodes[0].textContent === "ASURA+"){
            console.log(`ausra + ad: ${h2.outerHTML}`)
            target = (h2.parentElement).parentElement.parentElement
            target.remove()
        }
    })

    let adLoader = document.querySelector(".cnx-prebid-loader");

    if (adLoader) {
        console.log("removing: " + adLoader.outerHTML);
        adLoader.remove();
    } 
    // else{
    //     //console.log('cnx loader not found');
    // }

    
    document.querySelectorAll("div:has(h2)").forEach((div)=>{
        if (div.childNodes[0].innerText === "Upgrade to Asura+ Premium"){
            div.parentNode.remove()
        }
    })

    let button = document.querySelector('button[aria-label="Close promotion"')
    if (button){
        button.click()
    }

}

// catch leftover popups

let observer;
let config;
if (!observer){
    const patterns = [/.+netpub+./, /.+\-ad\-+./, /.+sticky/, /.+\-ads+./, /.+cnx+./]

    config = { childList: true, subtree: true }
    observer = new MutationObserver((mutationList, observer) => {
        for (let mutation of mutationList){
            if (mutation.type === "childList"){
                for (let m of mutation.addedNodes){
                    // console.log(`change: ${m.outerHTML}`)
                    try {
                        if (m.getAttribute("id")){
                            for (let pattern of patterns){
                                if (m.id.match(pattern)){
                                    //console.log(`removing: ${m.outerHTML}`)
                                    m.remove()
                                }
                            }
                        }
                        else if (m.getAttribute("class")){
                            for (let pattern of patterns){
                                if (m.getAttribute("class").match(pattern)){
                                    //console.log(`removing: ${m.outerHTML}`)
                                    m.remove()
                                }
                            }
                        }
                        else if (document.querySelector(".adxp-sticky")){
                            document.querySelector(".adxp-sticky").remove()
                        }
                        else if (m.getAttribute("title") === "Advertisement"){
                            m.remove()
                        }
                        
                    }
                    catch(err){
                        console.log(err)
                    }
                }
            }
        }

        directDelete();
    })
}
let targetNode = document.querySelector("body")
observer.observe(targetNode, config)

let observer2;
if (!observer2){
    targetNode2 = document.querySelector("html")
    observer2 = new MutationObserver((mutationList, observer) => {
        while (targetNode2.childNodes.length > 2){
            let tag = targetNode2.childNodes[targetNode2.childNodes.length - 1]
            if (tag.nodeName === "HEAD" || tag.nodeName === "BODY"){break}
            console.log(`${targetNode2.childNodes.length} \n ${tag.nodeName} \n ${tag.outerHTML}`)
            tag.remove()
        }
    })

    
    observer.observe(targetNode2, config)
}

// window.addEventListener("load", function() {
//     console.log("URL hash changed:", window.location.hash);
//     document.querySelectorAll("h2").forEach((h2) => {
//         let target;
//         if (h2.outerHTML.match(/.+ASURA\++./)){
//             console.log(h2.outerHTML)
//             target = (h2.parentElement).parentElement
//             target.remove()
//         }
//     })
    
//   });

window.addEventListener('load', directDelete)