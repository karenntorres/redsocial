const jwt = require('jsonwebtoken');

function generateToken(payload) {
	return new Promise((resolver, rechazar) => {
		jwt.sign(
			payload,
			'llave secreta',
			{ expiresIn: '1h' },
			(error, token) => {
				if (error) {
					rechazar(error);
				} else {
					resolver(token);
				}
			}
		);
	});
}

function verifyToken(token) {
	return new Promise((resolver, rechazar) => {
		jwt.verify(token, 'llave secreta', (error, decodificado) => {
			if (error) {
				rechazar(error);
			} else {
				resolver(decodificado);
			}
		});
	});
}

module.exports = {
	generateToken,
	verifyToken
};