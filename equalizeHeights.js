(function($) {
    var equalizeHeights = function(element, breakpoint=981) {
        var perform = function() {
            if(window.innerWidth < breakpoint) {
                return;
            }
            $(element).height("auto");
            var maxHeight = 0;
            $(element).each(function(){
                if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
            });
            $(element).height(maxHeight);
        };
        perform();
    
        onResize(perform);
        onMutations(perform, element);
        onAjaxCompletion(perform, element);
    
        return perform;
    }
    
    function onMutations(fn, element) {
        var observer = new MutationObserver(function() {
            fn();
        });
        $(element).each(function() {
            var thisElement = $(this)[0];
            observer.observe(thisElement, {
                subtree: true,
                childList: true 
            });
        });
    };
    
    function onResize(fn) {
        window.addEventListener('resize', fn()); 
    };
    
    
    function onAjaxCompletion(fn, element) {
        $(document).ajaxComplete(function() {
            $(element).imagesLoaded().then(function() {
               fn();
            });
        });
    };
    
    $.fn.imagesLoaded = function() {
        var $imgs = this.find('img[src!=""]');
        var dfds = [];
    
        if (!$imgs.length) {
            return $.Deferred().resolve().promise();
        }            
    
        $imgs.each(function(){
            var dfd = $.Deferred();
            dfds.push(dfd);
            var img = new Image();
    
            img.onload = function() {
                dfd.resolve();
            };
    
            img.onerror = function() {
                dfd.resolve(); 
            };
    
            img.src = this.src;
        });
    
        return $.when.apply($, dfds);
    }
    
    $(window).on('load', function() {
        equalizeHeights(".solutions-wrapper  .image-container"); 
        equalizeHeights(".solutions-wrapper h4:first-child"); 
    });    
})(jQuery);

