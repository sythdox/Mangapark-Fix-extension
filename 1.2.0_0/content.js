(function () {
  const DEFAULTS = { enabled: true };

  function getHost() {
    return window.location.protocol + "//" + window.location.host;
  }

  function fixImagesInPage() {
    const host = getHost();
    const imgs = document.getElementsByTagName("img");

    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const s = img.getAttribute("src");
      if (!s) continue;

     
      if (s.indexOf("//s") !== -1 && s.indexOf(".") !== -1) {
        let p = s.split("//")[1];
        p = p.substring(p.indexOf("/"));
        img.src = host + p;
      }
    }
  }

  let observer = null;
  let debounceTimer = null;

  function startObservers() {
    if (observer) return;

    
    fixImagesInPage();

    
    window.addEventListener("load", fixImagesInPage);

   
    observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(fixImagesInPage, 150);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function stopObservers() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }

  function applyEnabledState(enabled) {
    if (enabled) startObservers();
    else stopObservers();
  }

 
  chrome.storage.sync.get(DEFAULTS, (data) => {
    applyEnabledState(!!data.enabled);
  });


  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    if (changes.enabled) applyEnabledState(!!changes.enabled.newValue);
  });

  
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg && msg.type === "FIX_NOW") fixImagesInPage();
  });
})();
