const crypto = require('crypto');
const key = "AA94AA1E81DF9FAD";

function encrypt(plainText) {
	const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
	return Buffer.concat([cipher.update(plainText), cipher.final()]).toString(
		'base64'
	);
}

function decrypt(cipherText) {
	cipherText = Buffer.from(cipherText, 'base64');
	const cipher = crypto.createDecipheriv('aes-128-ecb', key, null);
	return Buffer.concat([cipher.update(cipherText), cipher.final()]).toString(
		'utf8'
	);
}

console.log(encrypt("-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDVJs/g0a2gm7PG\nK2uxEM0leddS1Bvtzq3YgEMEXf8e94OukKKX5/iWLoWsudzo2xUupDn7KEmhFhJ1\nhxdTSM2+kH5UpHthWidkq9hnQawo28DdKGkAnrDgvVt2M1Kb4+db+LwjWk7yf/Wl\nGKq594kOusgI9bu5jiDmaIWvS5AB/cqwQS6zAaFnGWQS28aEZMGDb4CVxypYByml\noJXX3EQ9rr9qs8wAsbNH4ZkcDu70L30/pAuODFXll4lGf4cZ5SPr2LVf3QFN/4pq\nrU1vY6H1w4SH/gQVSLUu9sNZ5nZeJ79Sjml6izJCkeKRVOqczJsSajFS/llziP/o\nGR8GD28PAgMBAAECggEAA04cZ8s/ZjIT4MP84dxaMNnuKiwhYnNBVmlwcuBjG7Hj\njJ6dqj3EqM3JJ9j+zv72GcQeScHGPVxHCtrHnZkPeV/GD/4TgR8D0u5xOTuE9c/N\nYCUZ6NufXYJ5BIVnWgUKKgD/KB6blOxUBf6ytU0TPaEoh5zAazlfd6e604PPFHw5\npbIv2r8zWcijb/pT9LTwwzXYcx3zpchEKMJM37anw6VyZ/IiWj0hMWQtq2CEwvK0\nFWjYbHHBkN7yiktLWmbbrkzmyl6znxDKK2Vk1kYXn2inOXGuc5IkmXnSKhXw9eSu\nQFcMirJR9Fnsfp2Knvk9ea7vHRzyXjPP7GGj15BvFQKBgQDrLifjjKVF+KOs7j5h\nLEtg4rX6ebmL2t2A/kN6KeNDsqJ9v75tS/z6vGjpUeylLG6iQjSoLvHRV58QqwUG\nsjgyt6dANd5WHyLg5cXZnBBXSJvRCuAFDRuacpoZZ0rUHjggAYuM3mQwHVj0qAtd\nhXQkeH/ssazvmlVuNg4C0Q9XRQKBgQDoBWyqMU4ipYGNvuHTWbVtwuwHUMzh1dc1\nDeKuBVyog0HdhcE8/8yZGqVQesmGbaYAHnjOF7ZXxYhWUm3CwNYcCyVuzDrzXIj3\nkO0Ubus9oWhR4g0N4qcrImPFqfUtlSfjlI6K6Ndmq6HD1N+B11cN/FQyFaI6phI7\nCrOfCyq4QwKBgEJVaXDYOcGrqNbc+AFGkhhIudVlQf19hR6eGQA7ElwE5aocTCTd\n2wQJ4nl03w+TobzoeZu6agCG+1mjMy65U/qSLH2C9CxMafUPOifvyfgkhbaHn7ot\nAU0l5+skZEnCIEh+xxK7o3yiunV/dH0zaBflWQe08bc/S7tjSb5nozEVAoGAXEHD\n6ox+YCJlOEJ9MvfJv2IxTdtgDDBmSS9DQiTZqhu+9eF4a9Peu8Yvk6evOCejSQrU\nyEX/eDkQNBrEkBrzR+Vatgq5KglSYPYcfvJ30WK7w0taG3pTNECRYYhp9/0GBmUM\npMle1PFL+j1Lvios8F+z7tJRVnawaw+fSo87JlcCgYBS/U2h8pLENYca/CvHXB84\nF2GzkUjnzxM5lxXd6YJCFy86dVICHsJADgFFCxgTZXbrpzNly3CEUeeayGZ6mdjz\nKXjr8ztoa5mZOBXaYjtdAJ2DD5ytvpOY1/wiNfsEikVDy6N2suJWzte3qo/zkcIW\not+F9x+IQjMHwNThIQP+mQ==\n-----END PRIVATE KEY-----\n"));