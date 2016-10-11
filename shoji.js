(function($){
    $.fn.shoji = function(options){
        return this.each(function(){
            var $this = $(this);
            var data = $.extend({}, $.fn.shoji.defaults, options);
            
            if(!$(this).data($.fn.shoji.defaults.data_index)){
                
                $(data['btn_open']).bind('click', function(e){
                    e.preventDefault();
                    var shata = $(this).data($.fn.shoji.defaults.data_index);
                    if(shata){
                        $.fn.shoji.open(shata['menu_object']);
                    }
                }).data(
                    $.fn.shoji.defaults.data_index, 
                    {'menu_object': $this}
                );
                
                $(data['btn_close']).bind('click', function(e){
                    e.preventDefault();
                    var shata = $(this).data($.fn.shoji.defaults.data_index);
                    if(shata){
                        $.fn.shoji.close(shata['menu_object']);
                    }
                }).data(
                    $.fn.shoji.defaults.data_index, 
                    {'menu_object': $this}
                );
                
                data['btn_open_object'] = $(data['btn_open']);
                data['btn_close_object'] = $(data['btn_close']);
                
                $this.data($.fn.shoji.defaults.data_index, data);
                $this.addClass($.fn.shoji.defaults.menu.replace('.', ''));
                
                $(window).trigger('resize');
            }
        });
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
        fullscreen_breakpoint: 'sm',
        sliding_menu_class: 'shoji-menu-hidden',
        active_menu_class: 'shoji-menu-active',
        btn_open: '.shoji-open-menu',
        btn_close: '.shoji-close-menu',
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
            if(shata['animate']){
                el
                    .addClass(shata['active_menu_class'])
                    .css({left: '-2000px'})
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
            }else{
                el.addClass(shata['active_menu_class']);
                $(document.body).css({overflow: 'hidden'});
            }
        }else if(window.innerWidth <= lower_break){
            el.addClass(shata['active_menu_class']);
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
            if(shata['animate']){
                el
                    .animate(
                        {
                            left: '-2000px'
                        }, 
                        {
                            'duration': 400, 
                            'complete': function(){
                                el
                                    .removeClass(shata['active_menu_class'])
                                    .css({left: 0});
                            }
                        }
                    );
            }else{
                el.removeClass(shata['active_menu_class']);
            }
        }else if(window.innerWidth <= lower_break){
            $(document.body).css({overflow: 'visible'});
            el.removeClass(shata['active_menu_class']);
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
                $(this).addClass(shata['sliding_menu_class']);
                shata['btn_open_object'].css({display: 'inline-block'});
            }else{
                $(this).removeClass(shata['active_menu_class']);
                $(this).removeClass(shata['sliding_menu_class']);
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