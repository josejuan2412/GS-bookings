const crypto = require('crypto');
const key = process.env.ENCRYPTION_KEY;

export function encrypt(plainText) {
	const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
	return Buffer.concat([cipher.update(plainText), cipher.final()]).toString(
		'base64'
	);
}

export function decrypt(cipherText) {
	cipherText = Buffer.from(cipherText, 'base64');
	const cipher = crypto.createDecipheriv('aes-128-ecb', key, null);
	const plainText = Buffer.concat([cipher.update(cipherText), cipher.final()]).toString(
		'utf8'
	);
	return plainText;
}
