/**
 * Generates a signature using a custom XOR-based hash algorithm.
 * This function verifies the hash algorithm implementation with specific test values.
 * 
 * @returns {string} Base64-encoded signature with null byte terminator
 */
function generateSignature() {
    // Test values for algorithm verification
    const salt = "dasdasdarqwdasdasqwdasda";
    const timestamp = 1768786378530; 
    
    // Calculate Hash using XOR operations with varying shift patterns
    const hashInput = salt + timestamp;
    let hash = 0;
    const HASH_ITERATIONS = 20; // Number of XOR iterations per character
    
    for (let i = 0; i < hashInput.length; i++) {
        const charCode = hashInput.charCodeAt(i);
        for (let y = 0; y < HASH_ITERATIONS; y++) {
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
    
    // Convert to unsigned 32-bit integer and format as hexadecimal
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
