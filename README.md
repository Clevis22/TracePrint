# TracePrint - Device Fingerprinting Library

TracePrint is a fingerprinting library that collects various device and browser information to generate a unique identifier. 
Built off of methods shown on [personaldata.info](https://personaldata.info)

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

Import the traceprint.js script in your page:

```html
<script src="/path/to/traceprint.js"></script>
```

Or use JSDelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/Clevis22/TracePrint@main/src/traceprint.js"></script>
```
Call the traceprint function:

```html
<script>
traceprint().then(fingerprint => {
  // Use fingerprint responsibly
}).catch(error => {
  console.error('Error:', error); 
});
</script>
```

The `traceprint` function returns a Promise that resolves to a hash string generated from collected data.

Here is a section I added about limitations:

## Limitations

While traceprint.js aims to collect identifying fingerprint data, there are some limitations:

- Fingerprinting is not 100% unique or persistent. Device configurations can change over time.

- Browsers like Tor and some privacy extensions can block or spoof fingerprints.

- Mobile device fingerprints are less accurate due to webview inconsistencies.

- Users with strict privacy settings may provide limited fingerprint data.

- Legal restrictions on device fingerprinting are increasing. Techniques may require review.

- Audio sampling fingerprint quality depends on hardware/OS audio implementation.

- Font fingerprints rely on OS providing API access to installed fonts.

Due to these constraints, the fingerprint hash should be considered probabilistic rather than an absolute identifier. Additional techniques may be needed for high security applications.

## Customization

You can customize data collection by modifying the `traceprint` function.

## Dependencies

- Modern browser supporting Web APIs like WebGL, AudioContext, etc.
- Crypto API for hashing data

## License

MIT
