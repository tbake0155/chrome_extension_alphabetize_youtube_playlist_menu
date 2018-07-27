function reload() 
{	
	var sections = document.getElementsByTagName('ytd-guide-section-renderer');
	
	for(var i=0; i<sections.length; i++)
	{
		var section = sections[i];
		
		var div = section.querySelector('#items');
		var para = section.querySelectorAll('#items ytd-guide-entry-renderer');
		var paraArr = [].slice.call(para).sort(function (a, b) 
		{
			return a.textContent > b.textContent ? 1 : -1;
		});
		paraArr.forEach(function (p) {
			div.appendChild(p);
		});	
	}
		
	sections = document.getElementsByTagName('ytd-section-list-renderer');
	
	for(var i=0; i<sections.length; i++)
	{
		var section = sections[i];
		
		var div = section.querySelector('#items');
		var para = section.querySelectorAll('#items ytd-grid-playlist-renderer');
		var paraArr = [].slice.call(para).sort(function (a, b) 
		{
			return a.textContent > b.textContent ? 1 : -1;
		});
		paraArr.forEach(function (p) {
			div.appendChild(p);
		});	
	}
}

function refresh()
{
	chrome.storage.local.get('refresh', function(result)
	{
		var check = result.refresh;
		if(check == true)
		{
			chrome.storage.local.set({'refresh': false}, function() 
			{
				if (chrome.extension.lastError) 
				{
					alert('An error occurred: ' + chrome.extension.lastError.message);
				}
			});
					
			window.location.href = window.location.href;
		}
	});	
}

function togglePlugin()
{
	chrome.storage.local.get('toggle', function(result)
	{
		var check = result.toggle;
		if(check == true)
		{
			reload();
		}
		else
		{
			refresh();
		}
	});	
}

function messageHandler(request, sender, sendResponse) 
{
	if (request.greeting == "active")
	{
		sendResponse({farewell: "activated"});
		togglePlugin();
	}
	if(request.greeting == "inactive")
	{
		sendResponse({farewell: "deactivated"});
		togglePlugin();
		
		chrome.storage.local.set({'refresh': true}, function() 
		{
			if (chrome.extension.lastError) 
			{
				alert('An error occurred: ' + chrome.extension.lastError.message);
			}
		});
	}
}

function afterLoaded()
{
	chrome.runtime.onMessage.addListener(messageHandler);
	togglePlugin();
}

if(document.readyState === 'loading') 
{
    document.addEventListener('DOMContentLoaded', afterLoaded);
} 
else 
{
    afterLoaded();
}
