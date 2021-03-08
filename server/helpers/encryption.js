const express = require('express');
const router = express.Router();

function encryption(userData) {
    const crypto = require('crypto');
    const algorithm = 'aes-192-cbc';
    // Key length is dependent on the algorithm. In this case for aes192, it is
    // 24 bytes (192 bits).
    // Use async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(userData.password, 'salt', 24);
    // Use `crypto.randomBytes()` to generate a random iv instead of the static iv
    // shown here.
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = '';
    cipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = cipher.read())) {
            encrypted += chunk.toString('hex');
        }
    });

    cipher.write('some clear text data');
    cipher.end();
    return encrypted;
}

module.exports = {
    "encryption": encryption
}