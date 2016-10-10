(function($){
    $.fn.shoji = function(options){
        return this.each(function(){
            var $this = $(this);
            var data = $.extend({}, $.fn.shoji.defaults, options);
            
            if(!$(this).data($.fn.shoji.defaults.data_index)){
                $(data['btn_open']).bind('click', function(e){
                    e.preventDefault();
                    $.fn.shoji.open($(this))
                });
                $(data['btn_close']).bind('click', function(e){
                    e.preventDefault();
                    $.fn.shoji.close($(this))
                });
                
                data['btn_open_object'] = $(data['btn_open']);
                data['btn_close_object'] = $(data['btn_close']);
                
                $this
                    .data($.fn.shoji.data_index, data)
                    .addClass($.fn.shoji.menu);
            }
        });
        $(window).trigger('resize');
    };
    $.fn.shoji.defaults = {
        breakpoints: {
            'lg': 1200,
            'md': 992,
            'sm': 768,
            'xs': 480,
            'xxs': 320
        },
        partial_breakpoint: 'md',
        fullscreen_breakpoint: 'xs',
        active_menu_class: 'shoji-menu-active',
        btn_open: '.shoji-open-menu',
        btn_close: 'sohji-close-menu',
        animate: true,
        animate_speed: 400,
        
        // These are global to the entire 
        // plugin
        menu: '.shoji-menu',
        data_index: 'shoji-menu', 
    };
    $.fn.shoji.open = function(el){
        var shata = el.data($.fn.shoji.defaults.data_index);
        if(!shata){
            return false;
        }
        
        var upper_break = shata['breakpoints'][shata['partial_breakpoint']];
        var lower_break = shata['breakpoints'][shata['fullscreen_breakpoint']];
        
        if(window.innerWidth <= upper_break && window.innerWidth > lower_break){
            el
                .css({left: '-2000px', display: 'block'})
                .animate(
                    {
                        left: 0
                    }, 
                    {
                        'duration': shata['animate_speed'],
                        'complete': function(){
                            $(document.body).css({overflow: 'hidden'});
                        }
                    }
                );
        }else if(window.innerWidth <= lower_break){
            el.css({display: 'block'});
            $(document.body).css({overflow: 'hidden'});
        }
    };
    $.fn.shoji.close = function(el){
        var el = el;
        var shata = el.data($.fn.shoji.defaults.data_index);
        if(!shata){
            return false;
        }
        
        var upper_break = shata['breakpoints'][shata['partial_breakpoint']];
        var lower_break = shata['breakpoints'][shata['fullscreen_breakpoint']];
        
        if(window.innerWidth <= upper_break && window.innerWidth > lower_break){
            $(document.body).css({overflow: 'visible'});
            el
                .animate(
                    {
                        left: '-2000px'
                    }, 
                    {
                        'duration': 400, 
                        'complete': function(){
                            el.css({display: 'none', left: 0});
                        }
                    }
                );
        }else if(window.innerWidth <= lower_break){
            $(document.body).css({overflow: 'visible'});
            el.css({display: 'none'});
        }
    };
    
    $(window).on('resize', function(e){
        $($.fn.shoji.defaults.menu).each(function(){
            var shata = $(this).data($.fn.shoji.defaults.data_index);
            if(!shata){
                return true;
            }
            
            var break_width = shata['breakpoints'][shata['partial_breakpoint']];
            if(window.innerWidth <= break_width){
                $(this).addClass(shata['active_menu_class']);
                if($(this).css('display') === 'block'){
                    $(document.body).css({overflow: 'hidden'});
                }
                shata['btn_open_object'].css({display: 'inline-block'});
            }else{
                $(this).removeClass(shata['active_menu_class']);
                $(document.body).css({overflow: 'visible'});
                shata['btn_open_object'].css({display: 'none'});
            }
        });
    });
    
    $(document).on('click', function(e) {
        if(
            !$(e.target).closest($.fn.shoji.defaults.menu).length &&  
            !$(e.target).closest($.fn.shoji.defaults.btn_open).length
        ){
            // Just close all
            $($.fn.shoji.defaults.menu).each(function(){
                $.fn.shoji.close($(this));
            });
        }
    });
})(jQuery);