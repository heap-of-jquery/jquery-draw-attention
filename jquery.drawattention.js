/*
License - you must retain this notice in ALL redistributions

Copyright 2013 Giuseppe Burtini      https://github.com/gburtini

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this library except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
   
*/

(function($) {
	$.drawAttention = function(param) {
		if(typeof(param) == "undefined")
			$("").drawAttention("create");
		else if (typeof(param) == "object")
			$("").drawAttention("create", param);
		else
			$("").drawAttention(param);
	}

	var methods = {
		create: function(options) {
			var defaults = {
				color: 'black',
				opacity: '0.6',
				shade: 'shade',
				style: "-moz-box-shadow: 0 0 11px #FFF;\n-webkit-box-shadow: 0 0 11px #FFF;\nbox-shadow: 0 0 11px #FFF;"
			}, settings = $.extend(defaults, options);

			var background = function() {
				if($("#" + settings.shade).length === 0) {
					$("body").append("<style type='text/css'>.highlighted-element{z-index: 9001;" + settings.style + "}</style>");
					$("body").append("<div class='highlight-shade' id='" + settings.shade + "'></div>");

					$("#" + settings.shade).css({
						'background-color':		settings.color,
						'opacity':			settings.opacity,
						'position':			'absolute',
						'top': 				'0',
						'left': 			'0',
						'z-index': 			'9000',
						'width': 			'100%',
						'pointer-events':		'none'
					}).height( $('body').outerHeight(true) );

					var shadeName = settings.shade;
					$(window).bind('resize.drawAttention', function() {
						$("#" + shadeName).height($('body').outerHeight(true));
					});
				}
			}
		
			background();
		},

		add: function() {
			$(this).each(function() {
				$(this).addClass("highlighted-element");

				var data = {
					'old': {
						'position': $(this).css("position"),
						'background-color': $(this).css("background-color")
					}
				};
				$(this).data("drawAttention", data);	// store old data

				$parent = $(this).parent();
				while($parent.length && $(this).css("background-color") == "rgba(0, 0, 0, 0)") {
					// "pull up" transparent backgrounds in to the foreground.
					$(this).css("background-color", $parent.css("background-color"))
					$parent = $parent.parent();
				}

				if($(this).css("position") == "static")
					$(this).css("position", "relative");
			});
		},

		remove: function() {
			$(window).unbind(".drawAttention");

			$(this).each(function() {
				$(this).removeClass("highlighted-element");
					
				if($(this).data("highlight").old['position'])
				{
					$(this).css("position", $(this).data("highlight").old['position']);
				}
				if($(this).data("highlight").old['background-color'])
				{
					$(this).css("background-color", $(this).data("highlight").old['background-color']);
				}
			});	
		},

		destroy: function() {
			methods.remove.apply($(".highlighted-element"));
			$('.highlight-shade').remove();		
		}
	};

	$.fn.drawAttention = function(method) {		
    	if ( methods[method] ) {
      		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
      		return methods.add.apply( this, arguments );
    	} else {
      		$.error( 'Method ' +  method + ' does not exist on jQuery.drawAttention' );
    	}    
  
		return this;
	}
})(jQuery);
