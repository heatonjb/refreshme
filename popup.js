document.getElementById("refreshForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const hour = parseInt(document.getElementById("hour").value);
    const minute = parseInt(document.getElementById("minute").value);
    const second = parseInt(document.getElementById("second").value);
    const millisecond = parseInt(document.getElementById("millisecond").value);
  
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: refreshAtSpecificTime,
        args: [hour, minute, second, millisecond]
      });
    });
  
   
  });

  function refreshAtSpecificTime(hour, minute, second, millisecond) {
    const now = new Date();
    //console.log('refreshtime');
    const refreshTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, millisecond);
    const refreshTimeMilli = (hour * 60 * 60 * 1000) + (minute * 60 * 1000) + (second * 1000) + (millisecond);

    const highestId = window.setTimeout(() => {
        for (let i = highestId; i >= 0; i--) {
          window.clearInterval(i);
        }
      }, 0);

    const timeUntilRefresh = refreshTime - now;
    console.log(`Page will refresh in ${timeUntilRefresh / 1000} seconds`);

    
  
    setTimeout(function() {
      location.reload();
      console.log('reloading now');
     
    }, timeUntilRefresh);


    let count = 0;
    function stoptime() {
        count = count+1;
        timeLeft = timeUntilRefresh - (1000 * count);
        if(timeLeft < 60000) {
            console.log(`Page will refresh in ${timeLeft / 1000} seconds`);

        }
    }
    setInterval(stoptime, 1000);

  }
  
  