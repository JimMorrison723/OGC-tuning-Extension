function UserName() {

	if ($('li#uzenetek').text()){
		return $('.header .userbox.right p a:eq(0)').text();
	}
	
}

function SettingsButton(){

	$('a.exit:eq(0)').after('<a class="extset" target="_blank" href="'+chrome.extension.getURL('/html/settings.html')+'">Bővítmény Beállítása</a>');
	
}

function GetLoc(){
	
	if(document.location.href.match('/privatemessage/')) {
		$('hozzaszolasok').parent("form").remove();
		return ".privat";
	}
	else{ //((document.location.href.match('/blog/')) || (document.location.href.match('/topic/')))
		return "#hozzaszolas";
	}

}

function SmileyButtons() {

		var loc = GetLoc();
		
        var arr =  [ "heart", "minishock", "biggrin", "blushing", "bored", "mellow", "tongue", "ohmy", "blink", "smile", "sad", "crying", "wink", "xd" ];
		var arr2 = [ "sziv", "oO", "vigyor", "pirul", "bocs", "uncsi", "nyelves", "omg", "wtf", "mosoly", "szomoru", "siros", "kacsint", "xd" ]; 
		
        for (var i = 0; i < arr.length-1; i++) {
            $(loc).before('<button id="smiley" value="'+arr2[i]+'"><img src="'+chrome.extension.getURL('/img/smiley/'+arr[i]+'.png')+'" /></button>');
        }
        $(":button[id=|smiley]").click(function () {
			if (loc == ".privat"){
				return;
			}
			else{
				$('#message').val($('#message').val()+":"+$(this).val()+":");
			}
        });
		$("input[type=submit]").click(function () {
				$('form').submit(function() { return true; });
        });
		
 }
 
 function SmileyChatButtons() {

		var arr =  [ "heart", "minishock", "biggrin", "blushing", "bored", "mellow", "tongue", "ohmy", "blink", "smile", "sad", "crying", "wink", "xd" ];
		var arr2 = [ "sziv", "oO", "vigyor", "pirul", "bocs", "uncsi", "nyelves", "omg", "wtf", "mosoly", "szomoru", "siros", "kacsint", "xd" ];
		
		$chatf  = $('.msgleft');
		var html = '';
		html += '<div id="chat_smileyk">';
        for (var i = 0; i < arr.length-1; i++) {
            html +='<button id="smiley" value="'+arr2[i]+'"><img src="'+chrome.extension.getURL('/img/smiley/'+arr[i]+'.png')+'" /></button>';
        }
		html+= '</div>'
		$(html).appendTo('.chat.ui-draggable');
        $(":button[id=|smiley]").click(function () {
				$('#chat_message').val($('#chat_message').val()+":"+$(this).val()+":");
        });
		
 }
 
function FormattingButtons() {
	
	var loc = GetLoc();
	
	$(loc).before('<br ><button id="formbold" value="b">[B]</button>');
	$(loc).before('<button id="formunder" value="u">[U]</button>');
	$(loc).before('<button id="formitalics" value="i">[I]</button>');
	$(loc).before('<button id="formimg" value="img">Kép</button>');
	$(loc).before('<button id="formimg" value="video">Videó</button>');
	$(loc).before('<button id="formlink" value="url">Link</button>');
		
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
 
function CommentsForMe() {

	var uName = UserName();
	//Highlight style
	var sty = {
		'background-color' : 'SpringGreen',
		'color' : '#333333'
    } 
	if (uName != ""){
		$('.valasz:contains("' + uName + '")').css(sty);	
	}
	
}

	
function extInit() {

	SettingsButton();
	
    if(dataStore['smiley_bar'] == 'checked') {
        SmileyButtons();
    }
	if(dataStore['smiley_chat_bar'] == 'checked') {
        SmileyChatButtons();
    }
 	if(dataStore['formatting_toolbar'] == 'checked') {
		FormattingButtons();
    } 
	if(dataStore['comments_for_me'] == 'checked') {
        CommentsForMe();
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