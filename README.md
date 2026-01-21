# MangaPark Fix Extension

A extension that automatically fixes broken MangaPark chapter images by rewriting the image URLs to the correct host.

## ✅ Installation (Desktop Chrome)
1. Open Chrome and go to: chrome://extensions/
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the extension folder
5. Visit mangapark.to

The fix will run automatically on supported MangaPark domains.

## 📱 Mobile Support (Android / iOS)
Unfortunately, Chrome Mobile does not support extensions. You have 2 options:

## ⭐ Option 1 (Recommended)
Use **Kiwi Browser** on Android (supports most Chrome extensions).

## 🔖 Bookmarklet Method (Works on some mobile browsers)
If you can’t use Kiwi, you can create a bookmark that runs the fix manually.

### Setup
1. Create a new bookmark in your browser
2. Name it: **MangaPark Fix**
3. Edit the bookmark URL and paste this:

javascript:(function(){try{const host=location.protocol+"//"+location.host;let runs=0;function fix(){const imgs=document.getElementsByTagName("img");for(let i=0;i<imgs.length;i++){const img=imgs[i];const s=img.getAttribute("src");if(!s)continue;if(s.indexOf("//s")!==-1&&s.indexOf(".")!==-1){let p=s.split("//")[1];p=p.substring(p.indexOf("/"));img.src=host+p;}}}fix();const id=setInterval(()=>{fix();runs++;if(runs>=40)clearInterval(id);},500);alert("MangaPark Fix running for 20s ✅");}catch(e){alert("MangaPark Fix error: "+e);}})();

You will need to click the bookmark every time you change chapters. I recommend using Kiwi Browser instead, but the bookmark method can be useful on devices like an iPad where bookmarks are easy to access on the side of the screen.

