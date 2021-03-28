# Write and Delete

Small js library to animate some writing effect through a list of strings.
It also supports settings for typo errors, to make it more human likely.

__Note__ It uses generators, so it's only supported in more modern browsers.

## [Demo](https://faebeee.github.io/write-and-delete/)
![Demo](https://raw.githubusercontent.com/faebeee/write-and-delete/master/assets/write_with_error.gif)

## [Codepen](https://codepen.io/faebeee/pen/vYyoPqY)

## Usage

## JavaScript 

Import the library

```html
<script src="https://unpkg.com/write-and-delete@VERSION/dist/lib.js"></script>
``` 
and then it's available in the global `window` scope.

```js
  writeAndDelete(document.querySelector("#header"), [
    "Buenos dias",
    "Good morning",
    "Guten Morgen ",
    "Buon giorno",
], {
    timeout: 1000,
    loop: true,
    speed: 200,
    errorQuota: 0.5,
    cursor: '_',
    cursorSpeed: 300,
});
```

### Web Component
this library is also available as a webcomponent.

Import the component 

```html
<script src="https://unpkg.com/write-and-delete@VERSION/dist/webcomponent.js"></script>
```

and then set it up in your markup

```html
<h1>
    <write-and-delete timeout="1000" loop="true" speed="200">JavaScript, HTML5, CSS3</write-and-delete>
</h1>
```

## Options

Property | Type | Description
---|---|---
timeout | `number` | `required` Timeout until next element is been written/deleted
speed | `number` | `required` Velocity of typing effect
speedVariation | `number` | A variation for the `speed` property. So it is not too linear
loop | `boolean` | Restart after reaching the last text in the list
errorQuota | `number` | Quota of typos injected in the text
errorCharacterMap | `string` | Custom string of characters used for the typo errors.
cursor | `string` | Character of the cursor like `/` or `_`
cursorSpeed | `number` | Speed of the blinking animation
