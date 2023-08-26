# TracePrint - Device Fingerprinting Library

TracePrint is a fingerprinting library that collects various device and browser information to generate a unique identifier. 

**Live Demo:** https://clevis22.github.io/TracePrint/

## Features

- Gathers device fingerprints based on:
  - Screen dimensions
  - Browser plugins
  - Timezone
  - Fonts
  - WebGL
  - Audio fingerprint
  - Local storage
  - ClientRects
  - And more!
- Hashes collected data to generate a unique identifier 
- Includes utility functions for device type detection, color gamut, reduced motion, etc.
- Lightweight and fast fingerprinting algorithm

### Responsible Use

While device fingerprinting has legitimate applications in security, analytics, and personalization, it also raises privacy concerns when used without user consent. When integrating TracePrint, please ensure:

- Users are informed about fingerprinting and given a choice to opt-out
- Data collection is limited to only necessary attributes
- Fingerprints are handled securely and not shared without consent
- Compliance with local regulations around user privacy and device tracking

## Usage

Import the `traceprint` function and call it to generate the fingerprint:

```js
import { traceprint } from 'traceprint';

const hash = await traceprint(); 
```

Or use JSDelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/Clevis22/TracePrint@main/src/traceprint.js"></script>

<script>
traceprint().then(fingerprint => {
  // Use fingerprint responsibly
}).catch(error => {
  console.error('Error:', error); 
});
</script>
```

The `traceprint` function returns a Promise that resolves to a hash string generated from collected data.

## Customization

You can customize data collection by modifying the `traceprint` function.

## Dependencies

- Modern browser supporting Web APIs like WebGL, AudioContext, etc.
- Crypto API for hashing data

## License

MIT
