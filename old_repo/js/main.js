(function ($) {
    "use strict";
    /*jslint browser: true*/
    /*global $, jQuery, alert*/
    
    $(document).ready(function () {
        $('.app').draggable({
            handle: ".titre-app",
            scroll: false
        });
        
        $('.icone-file').draggable({
            handle: false,
            scroll: false
        });
        
        $('#contenu-texte').each(function () {
            this.contentEditable = true;
        });
        
        $('#contenu-titre').each(function () {
            this.contentEditable = true;
        });
        
        $('#btn-rouge').click(function () {
            $('.app').fadeOut(200);
            $('.icone-file').fadeIn(100);
        });
        
        $('#btn-orange').click(function () {
            $('.app').fadeOut(200);
            $('.icone-file').fadeIn(100);
        });
        
        $('#btn-vert').click(function () {
            $('.app').toggleClass('elargie');
        });
        
        $('.icone-file').dblclick(function () {
            $('.app').fadeIn(300);
        });
        
    });
    
}(jQuery));