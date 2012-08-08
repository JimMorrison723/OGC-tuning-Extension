// Catch incoming messages
chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(event) {
    // Here comes the settings request, send back the entire localStoreage
        if(event.name == 'getSettings') {
            port.postMessage({ name : "setSettings", message : localStorage });
        }
    });
});
		
function install_notice() {
	if (localStorage.getItem('install_time'))
		return;
    var now = new Date().getTime();
        localStorage.setItem('install_time', now);
        chrome.tabs.create({url: "html/settings.html"});
}
install_notice();