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
/* 			'text-decoration':'underline',
			'font-weight':'bold',
			'padding':'0px 0px 0px 0px', */
			'width':'534px !important',
			'background':'#FFF'
		}
	// Get the location (messages or forum page)
	if(document.location.href.match('/privatemessage/')) {
	/* $('ul li a').css("background","none"); */
	/* $("image[src='i_author.png']").remove() */
		
		$('div.hozzaszolas div.hszszoveg div a').css(sty);
		$('div.hozzaszolas div.hszszoveg p a').css("margin left","-5px");
		$('bbcode').removeClass('div.hozzaszolas div.hszszoveg')
		/* $('.markItUpHeader a').css(sty);  */
		$('span.author a').css("background","transparent"); 
		$('div.linkek ul li a').css("background","url ()");
		return ".privat";
	}
	else if(document.location.href.match('/blogs/add')) {
		return ".bejegyzes:eq(1)";
	}
	else {
	$('div.hozzaszolas div.hszszoveg div a').css(sty);
		return "#hozzaszolas";
	}

}


function SmileyButtons() {
		
		var loc = GetLoc();
		
		AlapSmileyLetiltas();

		//Inject smileys
		var ard = '';
		
		//Create div for the smileys
		ard += '<div id="smileyk"> <p> ';
        
		for (var i = 0; i < arr.length-1; i++) {
			ard+= '<a href="#" title=":' + arr2[i] + ':"><img alt=":' + arr2[i] + ':" border="0" src="' + chrome.extension.getURL('/img/smiley/' + arr[i] + '.png') + '" /></a> ';
        } 
		ard += '</p> </div> ';
		
		$(loc).before(ard);
		$("#smileyk a").click(function(e) {
			e.preventDefault();
			emoticon = $(this).attr("title");
			$.markItUp( { replaceWith:emoticon } );
    });

 }
 
 function SmileyChatButtons() {
		
		$chatf  = $('.msgleft');
		
		//Inject smileys
		var html = '';
		
		//Create div for the smileys
		html += '<div id="chat_smileyk">';
        for (var i = 0; i < arr.length-1; i++) 
		{
            html +='<button id="smiley" value="' + arr2[i] + '"><img src="' + chrome.extension.getURL('/img/smiley/' + arr[i] + '.png') + '" /></button>';
        }
		html+= '</div>';
		$(html).appendTo('.chat.ui-draggable');
        
		//Smiley button click function
		$(":button[id=|smiley]").click(function () 
		{
				$('#chat_message').val($('#chat_message').val() + ":" + $(this).val() + ":");
        });
		
 }
 
 
function AddEditor () {
	
	var edi = '';
	edi += '<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL('/css/sm.css') + '" />';
	$(edi).appendTo('head');
	
	mySettings = {
	previewParserPath:	'', // path to your BBCode parser
	nameSpace:          "bbcode", // Useful to prevent multi-instances CSS conflict
	markupSet: [
			{name:'Félkövér', key:'B', openWith:'[b]', closeWith:'[/b]'},
			{name:'Dőlt', key:'I', openWith:'[i]', closeWith:'[/i]'},
			{name:'Aláhúzott', key:'U', openWith:'[u]', closeWith:'[/u]'},
			{separator:'---------------' },
			{name:'Kép beillesztése', key:'P', replaceWith:'[img][![Url]!][/img]'},
			{name:'Hivatkozás', key:'L', openWith:'[url=[![Url]!]]', closeWith:'[/url]', placeHolder:'Link címe...'},
		]
	}
	
	/* $("#message").markItUp(mySettings); */
	 
	$('.markItUpEditor').css("background:url(images/bg-editor.png)", "no-repeat");
	$('.markItUpContainer').css("background:url(images/bg-container.png)", "repeat-x");
}
 
function FormattingButtons() {
	
	//Get location
	var loc = GetLoc();
	
	//Forbid default smileys
	AlapSmileyLetiltas();


	AddEditor();

		if (loc == '.privat') {
				$(".privat").markItUp(mySettings);
		}
		else if(loc == '.bejegyzes:eq(1)') {
				$(".bejegyzes:eq(1)").markItUp(mySettings);
		}
		else {
				$("#message").markItUp(mySettings);		
		}	
	
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
	  $("ul.s_hir.show li.hir a:contains(" + text + ")").find("small").append(" (Új!)");
	  $("ul.s_minden.show li.hir a:contains(" + text + ")").find("small").append(" (Új!)");
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