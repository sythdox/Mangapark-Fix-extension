document.addEventListener("DOMContentLoaded", async () => {
    const loading = document.getElementById("loading");
    const message = document.getElementById("message");

    loading.classList.remove("hidden");
    message.textContent = "Fixing...";

    try{
        const [tab] = await chrome.tabs.query({ 
            active: true, 
            currentWindow: true 
        });

        await chrome.scripting.executeScript({ 
            target: { tabId: tab.id }, 
            func: fixImagesInPage 
        });

        loading.classList.add("hidden");
        message.textContent = "Fixed!";
    }
    catch (err) { 
        console.error(err); 
        loading.classList.remove("hidden"); 
        message.textContent = "There was an error trying to fix the images"; 
    }
    
});

function fixImagesInPage() {
    const host = window.location.protocol + "//" + window.location.host;
    const imgs = document.getElementsByTagName("img");

    for (let i = 0; i < imgs.length; i++) {
        let s = imgs[i].getAttribute("src");
        if (!s) continue;

        if (s.indexOf("//s") !== -1 && s.indexOf(".") !== -1) {
            let p = s.split("//")[1];
            p = p.substring(p.indexOf("/"));
            imgs[i].src = host + p;
        }
    }
}