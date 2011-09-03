function smiley_gombok() {
        var arr = [ "heart", "minishock", "biggrin", "blushing", "bored", "mellow", "tongue", "ohmy", "blink", "smile", "sad", "crying", "wink", "xd" ];
        for (var i = 0; i < arr.length-1; i++) {
                $('#hozzaszolas').before('<button id="smiley" value="'+arr[i]+'"><img src="'+chrome.extension.getURL('/img/smiley/'+arr[i]+'.png')+'" /></button>'); //value=":'+arr[i]+':" width=16 height=16
        }
        $(":button[id=|smiley]").click(function () {
                wherever_cursor_is = $('#message').val($('#message').val()+":"+$(this).val()+":");
        });    
 }
 
function extInit() {
 
        if(dataStore['smiley_gombok'] == 'checked') {
                smiley_gombok();
        }
}
 
 
var dataStore;
 
// Create a port to BG process
var port = chrome.extension.connect();
 
// Filter out iframes
// Send "getSettings" request
if (window.top === window) {
                port.postMessage({ name : "getSettings" });
}
 
// Catch incoming messages
port.onMessage.addListener(function(event) {
       
        // Here comes the settings, save a copy to dataStore var
        if(event.name == 'setSettings') {
                dataStore = event.message;
                       
                $(document).ready(function() {
                        extInit();
                });
        }
});