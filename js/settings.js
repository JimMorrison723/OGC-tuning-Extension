function saveOptions() {

        $('input:checkbox').click(function(){ 
	       localStorage[ $(this).attr('id') ] = $(this).attr('checked'); 
        });
}

function loadOptions() {
 
        $('input:checkbox').each(function() {
                if(localStorage[ $(this).attr('id') ] == 'checked') {
                        $(this).attr('checked', true);
                }
        });
}

$(document).ready(function() {
        
        loadOptions();
       
        $('input:checkbox').click(function(){
                localStorage[ $(this).attr('id') ] = $(this).attr('checked');
        });    
});