# Write and Delete

Small js library to animate some writing effect through a list of strings.

## [Demo](https://faebeee.github.io/write-and-delete/)

## [Codepen](https://codepen.io/faebeee/pen/vYyoPqY)

## Install

```html
<script src="https://unpkg.com/write-and-delete@VERSION/src/index.js"></script>
```

## Usage

```js
  writeAndDelete(document.querySelector("#header"), [
    "Buenas dias",
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
