var arr   = [ "heart", "minishock", "biggrin", "blushing", "bored", "mellow", "tongue", "ohmy", "blink", "smile", "sad", "crying", "wink", "xd" ];
var arr2 = [ "sziv", "oO", "vigyor", "pirul", "bocs", "uncsi", "nyelves", "omg", "wtf", "mosoly", "szomoru", "siros", "kacsint", "xd" ]; 

function UserName() {
	
	//Get the username
	if ($('li#uzenetek').text()){
		return $('.header .userbox.right p a:eq(0)').text();
	}
	
}

function SettingsButton() {

	//Place a button for the extension's options page
	$('a.exit:eq(0)').after('<a class="extset" target="_blank" href="' + chrome.extension.getURL('/html/settings.html') + '">Bővítmény Beállítása</a>');
	
}

function GetLoc(){
	var sty = { 
			'width':'534px !important',
			'background':'#FFF'
		}
	// Get the location (messages or forum page)
	if(document.location.href.match('/privatemessage/')) {
		return "";
	}
	else if(document.location.href.match('/blogs/add') || document.location.href.match('/blogs/edit')) {
		/*AlapSmileyLetiltas();*/
		return ".bejegyzes:eq(1)";
	}
	else {
	$('div.hozzaszolas div.hszszoveg div a').css(sty);
		AlapSmileyLetiltas();
		return "#message:first";
	}

}

function SmileyButtons() {
		
		var loc = GetLoc();
		
		/*AlapSmileyLetiltas();*/

		//Inject smileys
		var ard = '';
		//Create div for the smileys
		ard += '<div id="smileyk"> <p> ';
		for (var i = 0; i < arr.length-1; i++)
			ard+= '<img alt="' + arr2[i] + '" src="http://static.ogc.hu/images/smiley/'+ arr[i] + '.png" data-origin="'+arr[i]+'"/></a>';
		ard += '</p> </div> ';
		
		$(loc).before(ard);

		$('#smileyk img').click(function(e) {
			/* Code by dzsani */
			e.preventDefault();

			var tag = $(this).attr('alt'); // sziv
			var origin_source = $(this).data('origin'); //heart
	
			var bhtml = ':' + tag + ':';
			var ihtml = '<img src="http://static.ogc.hu/images/smiley/' + origin_source + '.png">';

			var tarea = $('textarea').val() + bhtml;
			var imod = $(".cleditorMain:first iframe").contents().find('body').html() + ihtml;

			$('textarea').val(tarea);
			$('textarea').cleditor()[0].focus();
			$('.cleditorMain:first iframe').contents().find('body').html(imod);
			$('textarea').cleditor()[0].focus();
		});

		//Szerkeszt gomb módosítása
		$('a.szerkeszt').click(function(e) {

			$('.cleditorMain:first iframe').contents().find('body').html($('#message:first').val());

		});

    };
 
 function SmileyChatButtons() {
		$chatf  = $('.msgleft');
		
		//Inject smileys
		var ard = '';
		//Create div for the smileys
		ard += '<div id="chat_smileyk">';
        for (var i = 0; i < arr.length-1; i++) 
            ard +='<a href="#" title=":' + arr2[i] + ':"><img alt=":' + arr2[i] + ':" border="0" src="' + chrome.extension.getURL('/img/smiley/' + arr[i] + '.png') + '" /></a> ';

		ard+= '</div>';
		$(ard).appendTo('.chat.ui-draggable');
        
		//Smiley button click function
		$("#chat_smileyk a").click(function (e) 
		{
			e.preventDefault();
			emoticon = $(this).attr("title");
			$('#chat_message').val($('#chat_message').val() + emoticon);
        });		
 }
 
function FormattingButtons() {
		var loc = GetLoc();
		
		// CLEditor
		$.cleditor.defaultOptions.width = 522;
		$.cleditor.defaultOptions.height = 200;
		$.cleditor.defaultOptions.controls = "bold italic underline | image link unlink | undo redo | source";
		$(loc).cleditor();
		$(loc).css('position', 'relative');

	
} 

function CommentsForMe() {

	var uName = UserName();
	//Highlight style
	if (uName != ""){
		$('.valasz:contains("' + uName + '")').css("background-color", "SpringGreen");	
	}
	
}

function AlapSmileyLetiltas() {

	$("#insert").remove();
	
}

function NewHighlight() {

	//Highlight style
	$('.hirblokk span.comments:contains("új")').parent().css("background-color", "#FFFF99");	
	
	// cim contain all the h3 elements you're searching
	var cim = $('.hirblokk span.comments:contains("új")').parent(".hirblokk").children("h3");

	// you're iterating on each title
	jQuery.each(cim, function(index,title) {
	  // you're searching links elements containing each title text
	  var text = $.trim($(title).text());
	  $(".scroller ul li a:contains(" + text + ")").find("small").append(" (Új!)");
	});
	
}

function extInit() {

	SettingsButton();
	
	if(dataStore['smiley_chat_bar'] == 'checked') {
        SmileyChatButtons();
    }
 	if(dataStore['formatting_toolbar'] == 'checked') {
		SmileyButtons();
		FormattingButtons();
    } 
	if(dataStore['comments_for_me'] == 'checked') {
        CommentsForMe();
    } 
	if(dataStore['highlight_new'] == 'checked') {
        NewHighlight();
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