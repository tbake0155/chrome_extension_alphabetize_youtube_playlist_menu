function activated(info) 
{
	chrome.tabs.executeScript({file:"contentscript.js"});
}

chrome.tabs.onActivated.addListener(activated);

