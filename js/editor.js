(function($) {

if(typeof $.fn.editor === "undefined") {

    var defaults = {
        media_url: "",
        content_css_url: "../css/editor.css"
    };

    $.fn.editor = function(options) {

    // build main options before element iteration
    var opts = $.extend(defaults, options);

    // iterate and construct the RTEs
    return this.each( function() {

        var textarea = $(this);
        var element_id = textarea.attr("id");

        // enable design mode
        textarea.before(toolbar());
        
        function disableDesignMode(submit) {

        }

        // create toolbar and bind events to it's elements
        function toolbar() {
            var tb = $("<div class='editor-toolbar' id='toolbar-"+ element_id +"'>\
                <p>\
                    <a href='#' class='bold'><img src='"+chrome.extension.getURL('/css/images/bold.png')+"' alt='bold' /></a>\
                    <a href='#' class='underline'><img src='"+chrome.extension.getURL('/css/images/underline.png')+"' alt='underline' /></a>\
                    <a href='#' class='italic'><img src='"+chrome.extension.getURL('/css/images/italic.png')+"' alt='italic' /></a>\
                </p>\
                <p>\
                    <a href='#' class='link'><img src='"+chrome.extension.getURL('/css/images/link.png')+"' alt='link' /></a>\
                    <a href='#' class='image'><img src='"+chrome.extension.getURL('/css/images/image.png')+"' alt='image' /></a>\
                    <a href='#' class='disable'><img src='"+chrome.extension.getURL('/css/images/menu.png')+"' alt='close rte' /></a>\
                </p></div>");

            $('select', tb).change(function(){
                var index = this.selectedIndex;
                if( index!=0 ) {
                    var selected = this.options[index].value;
                    formatText("formatblock", '<'+selected+'>');
                }
            });
            $('.bold', tb).click(function(){ formatText('bold');return false; });
            $('.italic', tb).click(function(){ formatText('italic');return false; });
            $('.unorderedlist', tb).click(function(){ formatText('insertunorderedlist');return false; });
            $('.link', tb).click(function(){
                var p=prompt("URL:");
                if(p)
                    formatText('CreateLink', p);
                return false; });

            $('.image', tb).click(function(){
                var p=prompt("image URL:");
                if(p)
                    formatText('InsertImage', p);
                return false; });

            $('.disable', tb).click(function() {
                disableDesignMode();
                var edm = $('<a class="rte-edm" href="#">Enable design mode</a>');
                tb.empty().append(edm);
                edm.click(function(e){
                    e.preventDefault();
                    enableDesignMode();
                    // remove, for good measure
                    $(this).remove();
                });
                return false;
            });

            var select = $('select', tb)[0];

            return tb;
        };

        function formatText(command, option) {
            edit.focus(); 
            edit.document.execCommand("bold", false, ""); 
            edit.focus();
        };

        function setSelectedType(node, select) {

        };

        function getSelectionElement() {
            
        };

    }); //return this.each
    
    }; // rte

} // if

})(jQuery);