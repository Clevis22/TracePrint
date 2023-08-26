async function traceprint() {
    const screenWidth = window.screen.width;
    const maxTouchPoints = navigator.maxTouchPoints;
    const screenHeight = window.screen.height;
    const availableScreenWidth = window.screen.availWidth;
    const availableScreenHeight = window.screen.availHeight;
    const pixelRatio = window.devicePixelRatio;
    const colorDepth = window.screen.colorDepth;
    const pixelDepth = window.screen.pixelDepth;
    const userLanguage = navigator.language || navigator.userLanguage;
    const platform = navigator.platform
    const userLanguages = navigator.languages;
    const useragent = window.navigator.userAgent;
    const screenOrientation = (window.screen.orientation && window.screen.orientation.type) || 'unknown';
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const networkType = navigator.connection ? navigator.connection.effectiveType : 'unknown';
    ReducedMotion = "0"
    if (isReducedMotionPreferred()) {
        // User prefers reduced motion
        // You can adjust your animations or UI accordingly
        ReducedMotion = "Reduced motion is preferred"
    } else {
        // User does not prefer reduced motion
        ReducedMotion = "Reduced motion is preferred"
    }


    const numberFormatter = new Intl.NumberFormat(userLanguage);
    const formattedNumber = numberFormatter.format(12345.67);

    const fixedFormattedDate = "August 25, 2023 14:30:00 GMT+0000"; // Replace with your desired date


    const currencyFormatter = new Intl.NumberFormat(userLanguage, {
        style: 'currency',
        currency: 'USD'
    });
    const formattedCurrency = currencyFormatter.format(12345.67);

    const prefersDarkUI = window.matchMedia('(prefers-color-scheme: dark)').matches;


    const dtype = detectDeviceType();

    const plugs = getBrowserPlugins();


    const webRTCInfo = await getWebRTCInfo();
    const localStorageSize = getLocalStorageSize();
    const localStorageQuota = getLocalStorageQuota();
    const audioFingerprint = await getAudioContextFingerprint();
    await delay(1000); // Wait for 1 second
    const webGPU = await getWebGPUInfo();
    const colorGamut = getColorGamut();
    const webDriver = webdriver();
    const pluginSpoof = pluginspoof();
    const clientRects = getInvisibleElementClientRects();


    const data = {
        screenWidth,
        screenHeight,
        availableScreenWidth,
        availableScreenHeight,
        pixelRatio,
        colorDepth,
        pixelDepth,
        userLanguage,
        userLanguages,
        useragent,
        userTimeZone,
        formattedNumber,
        fixedFormattedDate,
        formattedCurrency,
        prefersDarkUI,
        dtype,
        plugs,
        localStorageQuota,
        localStorageSize,
        networkType,
        screenOrientation,
        platform,
        maxTouchPoints,
        audioFingerprint,
        webGPU,
        ReducedMotion,
        colorGamut,
        webDriver,
        pluginSpoof,
        clientRects,
        webRTCInfo
    };


    const isWebGLSupported = (function() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    })();

    if (isWebGLSupported) {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const glVendor = gl.getParameter(gl.VENDOR);
        const glRenderer = gl.getParameter(gl.RENDERER);
        const glVersion = gl.getParameter(gl.VERSION);
        const glShadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
        data.isWebGLSupported = true;
        data.glVendor = glVendor;
        data.glRenderer = glRenderer;
        data.glVersion = glVersion;
        data.glShadingLanguageVersion = glShadingLanguageVersion;
    } else {
        data.isWebGLSupported = false;
    }

    if ('fonts' in navigator) {
        const localFontAccess = navigator.fonts;
        try {
            const installedFonts = await localFontAccess.queryLocalFonts();
            data.installedFonts = installedFonts.map(font => font.family);
        } catch (error) {
            console.error('Error querying local fonts:', error);
        }
    }

    // Hashing the data
    const jsonString = JSON.stringify(data);
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(jsonString));
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}


async function getWebGPUInfo() {
    try {
        await delay(2000);
        let info = "";

        if (!navigator.gpu) {
            info += "WebGPU is not supported on this device.";
        } else {
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                info += "Couldn't request WebGPU adapter.";
            } else {
                const adapterInfo = await adapter.requestAdapterInfo();
                const device = await adapter.requestDevice();

                info += `WebGPU Information:\n`;

                // Adapter Info
                info += `Supported Adapters: #1 ${adapter.name}\n`;
                info += `Vendor: ${adapterInfo.vendor}\n`;
                info += `Description: ${adapter.description}\n`;
                info += `Architecture: ${adapterInfo.architecture}\n`;
                info += `Name: ${adapter.name}\n`;
                info += `Is Fallback Adapter: ${adapter.fallbackAdapter}\n`;

                // Adapter Limits
                const limits = device.limits;
                info += `\nAdapter Limits:\n`;
                for (const key in limits) {
                    info += `${key}: ${limits[key]}\n`;
                }

                // Adapter Features
                if (adapter.features) {
                    const features = adapter.features;
                    info += `\nAdapter Features:\n`;
                    // ... Include other feature information ...
                } else {
                    info += `\nAdapter Features: Not available\n`;
                }
            }
        }

        return info;
    } catch (error) {
        return `An error occurred while retrieving WebGPU information: ${error.message}`;
    }
}



async function main() {
    try {
        const hash = await traceprint();
        //console.log('Hash of Collected Data:', hash);
    } catch (error) {
        console.error('Error collecting device info:', error);
    }
}

main();

async function getAudioContextFingerprint() {
    const audioContext = new AudioContext();
    const oscillatorNode = audioContext.createOscillator();
    const analyserNode = audioContext.createAnalyser();

    oscillatorNode.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillatorNode.connect(analyserNode);
    analyserNode.fftSize = 256; // Adjust the buffer size for your needs.

    oscillatorNode.start(audioContext.currentTime);
    oscillatorNode.stop(audioContext.currentTime + 0.01); // Adjust the duration as needed.

    const bufferLength = analyserNode.frequencyBinCount;
    const magnitude = new Float32Array(bufferLength);
    analyserNode.getFloatFrequencyData(magnitude);

    const fingerprint = getFingerprint(magnitude);
    return fingerprint;
}

function getFingerprint(magnitude) {
    const mean = getMean(magnitude);
    const standardDeviation = getStandardDeviation(magnitude);
    return [mean, standardDeviation];
}

function getMean(magnitude) {
    const sum = magnitude.reduce((acc, val) => acc + val, 0);
    return sum / magnitude.length;
}

function getStandardDeviation(magnitude) {
    const mean = getMean(magnitude);
    const sumOfSquares = magnitude.reduce((acc, val) => acc + (val - mean) ** 2, 0);
    return Math.sqrt(sumOfSquares / magnitude.length);
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isReducedMotionPreferred() {
    try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (error) {
        // Handle the error gracefully, e.g., by assuming no preference for reduced motion.
        console.error('Error checking reduced motion preference:', error);
        return false; // Return a default value
    }
}

function getColorGamut() {
    try {
        if (window.matchMedia('(color-gamut: srgb)').matches) {
            return 'sRGB';
        } else if (window.matchMedia('(color-gamut: p3)').matches) {
            return 'Display P3';
        } else if (window.matchMedia('(color-gamut: rec2020)').matches) {
            return 'Rec. 2020';
        } else {
            return 'Unknown';
        }
    } catch (error) {
        console.error('Error getting color gamut:', error);
        return 'Unknown';
    }
}

function webdriver() {
    if (navigator.webdriver) {
        return true
    } else {
        return false
    }
}

function pluginspoof() {
    if (navigator.plugins.length === 0) {
        return "spoofed"
    } else {
        return "notspoofed"
    }
}

function detectDeviceType() {
    var userAgent = navigator.userAgent;
    var deviceType = "desktop";

    if (/(tablet|ipad|playbook|silk)|(android(?!. *mobi))/i.test(userAgent)) {
        deviceType = "tablet";
    } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(userAgent)) {
        deviceType = "mobile";
    }

    return deviceType;
}

function getLocalStorageQuota() {
    if ('localStorage' in window) {
        return (localStorage.length * 16 / (1024 * 1024)).toFixed(2) + ' MB';
    }
    return 'N/A';
}

function getLocalStorageSize() {
    if ('localStorage' in window) {
        return JSON.stringify(localStorage).length;
    }
    return 'N/A';
}

function getBrowserPlugins() {
    var plugins = navigator.plugins;
    var pluginList = [];
    for (var i = 0; i < plugins.length; i++) {
        pluginList.push({
            name: plugins[i].name,
            description: plugins[i].description,
            filename: plugins[i].filename,
            version: plugins[i].version,
            enabled: plugins[i].enabled
        });
    }
    return pluginList;
}



function getInvisibleElementClientRects() {

    // Create invisible element
    const element = document.createElement('div');
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    element.style.top = '-9999px';
    document.body.appendChild(element);

    // Populate with text
    element.textContent = 'Sample text for fingerprinting';

    // Get client rects
    const clientRects = element.getClientRects();

    // Remove element
    document.body.removeChild(element);
    return clientRects;

}

async function getWebRTCInfo() {

    const peerConnection = new RTCPeerConnection({
        iceServers: []
    });

    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        const localSDP = peerConnection.localDescription;

        // Get list of candidate networks
        const networks = [];
        peerConnection.getStats()
            .then(stats => {
                stats.forEach(report => {
                    if (report.type === 'candidate-pair' && report.nominated) {
                        const remoteCandidate = report.remoteCandidateId;
                        networks.push(remoteCandidate.split(' ')[0]);
                    }
                });
            });

        // Extract browser plugin details
        const plugins = [];
        localSDP.sdp.replace(/a=rtpmap:(\d+) (\S+)\/([\d]+)/g, (m, payloadType, codec, rate) => {
            plugins.push({
                payloadType,
                codec,
                rate
            });
        });

        return {
            networks,
            plugins
        };

    } finally {
        peerConnection.close();
    }

}
