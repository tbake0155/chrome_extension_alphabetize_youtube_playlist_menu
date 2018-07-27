function toggle () 
{
	var checkBox = document.getElementById("toggle_checkbox");
	var active = document.getElementById("active");
	var inactive = document.getElementById("inactive");
	
	var check = checkBox.checked;
		
	chrome.storage.local.set({'toggle': check}, function() 
	{
        if (chrome.extension.lastError) 
		{
            alert('An error occurred: ' + chrome.extension.lastError.message);
        }
    });
		
	if(check == true)
	{
		inactive.style.display = "none";
		active.style.display = "block";
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
		{
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "active"}, function(response) 
			{
				console.log(response.farewell);
			});
		});
	}
	else
	{
		inactive.style.display = "block";
		active.style.display = "none";
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
		{
			chrome.tabs.sendMessage(tabs[0].id, {greeting: "inactive"}, function(response) 
			{
				console.log(response.farewell);
			});
		});
	}
}

function afterLoaded()
{
	document.getElementById('toggle_checkbox').addEventListener("click", toggle);
	
	var checkBox = document.getElementById("toggle_checkbox");
	var active = document.getElementById("active");
	var inactive = document.getElementById("inactive");
	
	chrome.storage.local.get('toggle', function(result)
	{
		var check = result.toggle;
		if(check == true)
		{
			inactive.style.display = "none";
			active.style.display = "block";
			checkBox.checked =  true;

		}
		else
		{
			inactive.style.display = "block";
			active.style.display = "none";
			checkBox.checked = false;

		}
	});
}

if(document.readyState === 'loading') 
{
    document.addEventListener('DOMContentLoaded', afterLoaded);
} 
else 
{
    afterLoaded();
}
