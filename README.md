# TracePrint

TracePrint is a fingerprinting library that collects various device and browser information to generate a unique identifier. Check out the demo here: [https://clevis22.github.io/TracePrint/](https://clevis22.github.io/TracePrint/)

## Features

- Gathers info like:
  - Screen dimensions
  - Browser plugins
  - Timezone
  - Fonts
  - WebGL
  - Audio fingerprint
  - Local storage
  - ClientRects
  - And more!
- Hashes collected data to generate unique identifier 
- Includes utility functions for device type detection, color gamut, reduced motion, etc
- Designed to be lightweight and fast

## Usage

Import the `traceprint` function and call it to generate the fingerprint:

```js
import { traceprint } from 'traceprint';

const hash = await traceprint();
```
Or use JSDelivr
```html
<script src = "https://cdn.jsdelivr.net/gh/Clevis22/TracePrint@main/src/traceprint.js"></script>
<script>
traceprint().then(fingerprint => {
    const userID = fingerprint
    console.log('Fingerprint:', userID);
}).catch(error => {
    console.error('Error:', error);
});
</script>
```

The `traceprint` function returns a Promise that resolves to a hash string generated from the collected data.


## Customization

The library collects a wide array of data points by default. You can customize what gets collected by modifying the `traceprint` function.

## Dependencies

TracePrint requires:

- Modern browser that supports Web APIs like WebGL, AudioContext, etc
- Crypto API for hashing data

## License

MIT
