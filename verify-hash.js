function generateSignature() {
    // Corrected Salt from hex decoding
    const salt = "dasdasdarqwdasdasqwdasda";
    
    // Target timestamp
    const timestamp = 1768786378530; 
    
    // Calculate Hash
    const hashInput = salt + timestamp;
    let hash = 0; 
    
    for (let i = 0; i < hashInput.length; i++) {
        const charCode = hashInput.charCodeAt(i);
        for (let y = 0; y < 20; y++) {
            const mode = y % 3;
            const shift = y % 8;
            if (mode === 0) {
                hash ^= (charCode << shift);
            } else if (mode === 1) {
                hash ^= (charCode >> shift);
            } else {
                hash ^= charCode;
            }
        }
    }
    
    const hexHash = (hash >>> 0).toString(16);
    console.log("Calculated Hash (Hex):", hexHash);
    
    const rawString = hexHash + timestamp.toString();
    // Add null byte to match expected format
    const buffer = Buffer.from(rawString + '\0');
    const base64Str = buffer.toString('base64');
    
    return base64Str;
}

const result = generateSignature();
const expected = "MTJkZjE3Njg3ODYzNzg1MzAA";
console.log("Expected:", expected);
console.log("Actual:  ", result);
console.log("Match:   ", result === expected);
