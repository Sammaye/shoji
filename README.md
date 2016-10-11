# shoji
A jQuery plugin which can take a page element and turn it into a mobile 
ready sliding menu

Shoji will turn your layout columns into mobile friendly sliding menus.

## Example

Let's take an example:

``` html
<div class="row some-search-page">
  <div class="col-search-filters col-sm-20 col-md-14 col-lg-12">
     // some serch filters
  </div>
  <div class="col-search-results col-sm-48 col-md-34 col-lg-36">
     // some search results
  </div>
</div>
```

Essentially, this is much like the layout for an Amazon type product search.  
The left hand side will contain a set of filters and the right hand side will have the 
seach results as a list of products.

Let's say, on smaller screens you want the left bar to be able to function 
same space as the search results so, you think to yourself "I need to make a 
sliding menu like they do on all those cool applications!".

So, you begin with adding:

``` css
.shoji-menu-hidden{
	display:none;
	position:fixed;
	z-index:9000;
	top:0;
	left:0;
	bottom:0;
	right:0;
	overflow-y:scroll;
	overflow-x:hidden;	
}

.shoji-menu-active{
	display:block;
}
```

to your CSS and finish with calling the jQuery plugin like so:

``` javascript
$('.col-search-filters').shoji();
```

and, voila! It is done.

## How it work?

This extension is actually very simple. You will notice I used a 
Bootstrap grid in my example above. 

The default break for Shoji is `sm` as such I want to make sure that my right 
hand ide is actually fll width on `sm` so I make my right hand side:

``` html
<div class="col-search-results col-sm-48 col-md-34 col-lg-36">
```

But then I want my left hand side to be of some decent size on `sm`, since the default 
is full screen on `xs`, so I have added a `col-sm-20` to my left hand side.

This meanns that on `sm` size my left hand side will be full width while my filters menu 
floats at the left with a size of `20`.

On `xs` it will just full the whole screen so, meh!

## Me want to change

The pugin has a comprehensive set of options within it's constructor if you look at the 
code here https://github.com/Sammaye/shoji/blob/master/shoji.js#L42. It literally allows
you to do everything, from stating breakpoints (for custom grids other 
than Bootstrap, for example), to defining animations and which direction menus should 
appear from (left or right).

**Quick note:** `partial_breakpoint` signifies when the menu will slide in from the 
left/right of the screen and `fullscreen_breakpoint` defines when the menu will 
consume the entire screen and not animate.

