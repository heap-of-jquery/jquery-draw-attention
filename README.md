# jQuery.drawAttention.js

## Instructions
1. call $.drawAttention() to start a highlighting context
2. call $("selector").drawAttention("add"); to add to the highlighted elements
3. call $("selector").drawAttention("remove"); to remove from the highlighted elements
4. call $.drawAttention("destroy"); to destroy the highlighting context and return to the regular page

## Parameters

The constructor ($.drawAttention) can take an object of parameters. Currently, these are, by default:

```javascript
color: 'black',	// the color of the shade
opacity: '0.6',	// the opacity of the shade
shade: 'shade',	// the name of the shade

// the additional style to apply to the highlighted elements
style: "-moz-box-shadow: 0 0 11px #FFF;
	-webkit-box-shadow: 0 0 11px #FFF;
	box-shadow: 0 0 11px #FFF;"
```

## Screenshot
![Example](http://i.imgur.com/2SU5wlX.png)

Here I have selected some arbitrary elements (the headers in the left column and the listing for the game "Off-balance") to be highlighted while everything else remains under a 60% opacity shade.

## Known Issues
* uses z-index to move elements above the shade
* uses pointer-events to allow clicks to pass through the shade (may not be desired and has poor support: http://caniuse.com/pointer-events)
* transparent elements "pull up" their background color above the shade -- this may not be desirable if: 
  * 1. the background color is "close" to the shade color
  * 2. the background is actually an image (may just be lost).
* transparency is detected with rgba(0, 0, 0, 0) which is probably not the ideal way to do it. 

## License 

Please retain this notice in ALL redistributions as well as a link back to the original repository.

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
