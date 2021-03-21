# Write and Delete

Small js library to animate some writing effect through a list of strings.

## [Demo](https://faebeee.github.io/write-and-delete/)

## Install


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
    speedVariation: 2,
    errorQuota: 0.5,
    cursor: '_',
    cursorSpeed: 300,
});
```

## Options

Property | Type | Description
---|---|---
timeout | `number` | 
speed | `number` |
speedVariation | `number` | 
loop | `boolean` |
errorQuota | `number` |
errorCharacterMap | `string` |
cursor | `string` |
cursorSpeed | `number` | 
