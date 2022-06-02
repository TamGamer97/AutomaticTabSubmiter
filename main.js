setTimeout(() => {
    mainFunc()
}, 700)

async function mainFunc()
{
    console.log('started program')
    const popupClassName = 'ui dimmer modals page transition visible active'
    
    function a() {
        try{
            const popup = document.getElementsByClassName(popupClassName)
            if(popup.length)
            {
                console.log(popup)
                console.log('Found Popup')
                // alert("Found Popup")
                submitTabs()
                return
            }
        }catch{
    
        }
        
        setTimeout(a, 1000)
    }
    a()
    
    async function submitTabs()
    {
        // send message to background scripts
        var port = chrome.runtime.connect({name: "tabChanger"});
        
        port.postMessage({msg: "changeTabs"});
        
        port.onMessage.addListener(function(response) {
            if (response.msg == "Done!")
            {
                // port.postMessage({msg: "Madame"});
                // alert('On new tab')
                // setTimeout(() => {
                //     alert('waited 5 seconds')
                // }, 5000);
            }
        });
    }
}