async function bookApointment()
{
    console.log('Submiting button')

    const btnClass = 'ui primary large submit right floated button'

    if(document.getElementById('id_country').value)
    {
        if(document.getElementById('id_city').value)
        {
            if(document.getElementById('id_traveled_country').value)
            {
                document.getElementsByClassName(btnClass)[0].click()
                console.log('clciked')
            }
        }
    }

    submitTabs()
}


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

console.log('book apointment')
bookApointment()