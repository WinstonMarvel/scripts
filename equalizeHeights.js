(function($) {
    $(document).ready(function() {
        $(window).resize(function() {
            $('.et_blog_grid_equal_height').each(function() {
                equalise_articles($(this));
            });
        });

        $('.et_blog_grid_equal_height').each(function() {
            var blog = $(this);

            equalise_articles($(this));

            var observer = new MutationObserver(function(mutations) {
                equalise_articles(blog);
            });
            
            var config = {
                subtree: true,
                childList: true 
            };

            observer.observe(blog[0], config);
        });

        function equalise_articles(blog) {
            var articles = blog.find('article');
            var heights = [];
            
            articles.each(function() {
                var height = 0;
                height += ($(this).find('.et_pb_image_container, .et_main_video_container').length != 0) ? $(this).find('.et_pb_image_container, .et_main_video_container').outerHeight(true) : 0;
                height += $(this).find('.entry-title').outerHeight(true);
                height += ($(this).find('.post-meta').length != 0) ? $(this).find('.post-meta').outerHeight(true) : 0; 
                height += ($(this).find('.post-content').length != 0) ? $(this).find('.post-content').outerHeight(true) : 0;    

                heights.push(height);
            });

            var max_height = Math.max.apply(Math,heights); 

            articles.each(function() {
                $(this).height(max_height);
            });
        }

        $(document).ajaxComplete(function() {
            $('.et_blog_grid_equal_height').imagesLoaded().then(function() {
                $('.et_blog_grid_equal_height').each(function(){
                    equalise_articles($(this));
                });
            });
        });

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
    });
})(jQuery);

