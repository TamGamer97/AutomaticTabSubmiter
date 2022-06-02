console.log('background')


async function switchNextTab(port)
{
    await chrome.tabs.query({currentWindow: true, active: true}, async function(tabsArray) {
        // If there are fewer than 2 tabs, you are on the only tab available.
        // Nothing left to do.
        console.log(tabsArray)
        // if( tabsArray.length < 2 ) {console.log('less than 2 tabs'); return;}
        // Else query tab with incremented index (e.g. next tab):
        await chrome.tabs.query({index: (tabsArray[0].index+1)}, async function(nextTabsArray){
            // There is no next tab (only 1 tab or user is on last tab)
            if( nextTabsArray.length < 1 ) return;
            // Else, yay! There is a next tab, lets go!
            await chrome.tabs.update(nextTabsArray[0].id, {active: true})
            console.log('changed tab')
            port.postMessage({msg: "Done!"});

            chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
                var tab = tabs[0];
                var url = tab.url;
                console.log(tab)
                inject(tab)
            });
            

        });  
    });
}

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "tabChanger");

    port.onMessage.addListener(async function(response) {
        if (response.msg === "changeTabs")
        {
            await switchNextTab(port)
            // port.postMessage({msg: "Done!"});
            
        }
    });

  });


  function inject(tab) {
    return runContentScript(tab.id, {
      file: 'submitBtn.js',
      runAt: 'document_end',
      allFrames: false,
    });
  }
  
  function runContentScript(tabId, options) {
    return new Promise(resolve => {
      chrome.tabs.executeScript(tabId, options, resolve);
    });
  }
// switchNextTab()