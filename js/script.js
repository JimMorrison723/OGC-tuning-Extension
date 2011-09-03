function SmileyButtons() {
        var arr = [ "heart", "minishock", "biggrin", "blushing", "bored", "mellow", "tongue", "ohmy", "blink", "smile", "sad", "crying", "wink", "xd" ];
        for (var i = 0; i < arr.length-1; i++) {
                $('#hozzaszolas').before('<button id="smiley" value="'+arr[i]+'"><img src="'+chrome.extension.getURL('/img/smiley/'+arr[i]+'.png')+'" /></button>'); //value=":'+arr[i]+':" width=16 height=16
        }
        $(":button[id=|smiley]").click(function () {
                wherever_cursor_is = $('#message').val($('#message').val()+":"+$(this).val()+":");
        });    
 }
 
function FormattingButtons() {
	$('#hozzaszolas').before('<br ><button id="formbold" value="b">[B]</button>');
	$('#hozzaszolas').before('<button id="formunder" value="u">[U]</button>');
	$('#hozzaszolas').before('<button id="formitalics" value="i">[I]</button>');
	$('#hozzaszolas').before('<button id="formimg" value="img">Kép</button>');
	$('#hozzaszolas').before('<button id="formlink" value="url">Link</button>');
		
	$(':button[id^="form"]').click(function () {
        if ([$(this).attr("value")]=='url'){
		    $('#message').val($('#message').val() + '[' + $(this).val() + '=link]' + getSelectedText() + '[/' + $(this).val() + ']');
		}
		else{
			$('#message').val($('#message').val() + '[' + $(this).val() + ']' + getSelectedText() + '[/' + $(this).val() + ']');
		}
        evt.preventDefault();
    });  
	
	 function getSelectedText() {
		if (window.getSelection) {
			return window.getSelection();
		}
		else if (document.selection) {
			return document.selection.createRange().text;	
		}
		return '';
	}
} 
 

	
function extInit() {
        if(dataStore['smiley_bar'] == 'checked') {
                SmileyButtons();
        }
 		if(dataStore['formatting_toolbar'] == 'checked') {
                FormattingButtons();
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