const crypto = require('crypto');
const https = require('https');

const toBase64URL = (json) => {
    const jsonString = JSON.stringify(json);
    const btyeArray = Buffer.from(jsonString);
    return btyeArray.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

const crateJWT = () => {
    const header = {
        alg: 'RS256',
        typ: 'JWT'
    }
    
    const time = new Date().getTime() / 1000;
    const expireTime = time + (60 * 60);
    
    const claimSet = {
        iss: 'apigoogleplayconsolestatistics@pc-api-7862370527930174087-737.iam.gserviceaccount.com',
        iat: time,
        exp: expireTime,
        scope: 'https://www.googleapis.com/auth/androidpublisher',
        aud: 'https://oauth2.googleapis.com/token'
    }
    
    const encodedHeader = toBase64URL(header);
    const encodedClaimSet = toBase64URL(claimSet);

    const signer = crypto.createSign('RSA-SHA256');

    signer.write(encodedHeader + '.' + encodedClaimSet);
    signer.end();

    const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGfk9E307n3Kqi\nYgysfsi8/NyDOsSXO/PmPBMIvIO34NKVG+F0Xcxfw/D2EBLra2qPc5fVA8QNr5mx\nmih8eBs+h4WghS1gCm80ZbwHxoyJTys3+cZV/vX+mTcLBk6q8qd/tIWGFcwDqhHc\na6FusLNmrxiVBc7cUKFOUKsUf+0ICGSk4zQaPpVQwTtfmpJzvjJ1VFhVMTRib/pX\nPq72CkrBSx2Ceb/fLvuXlgLxAaVqyLfKYapXxcChpq2MnzyIUes4BqE5P4mxhJyY\nR9GRTwzjG7t7lH53LJdeG963rdJgqxMG2Com940+wEsCvMXelLAtbdyTCWm8AnYE\nlr4s7bw9AgMBAAECggEAF6n2VFfVEI0SZg06GpR7j8Bg9QoxZsr1zw8pa8NhvARt\nxpYOK7Evt4O6JfO7oF0W1VGqxRv6UxwKFDjfNnDxOo6t7nmsyQQ6xsHm3VHH7moa\n/8TjkYa1wsEhuqA+tQr8ehvw8TqHBIbRiKLnmjUvENZeIAy9toQBqb8HQ7M5Sdl/\nHJfSGzY5IjO8R6Qm0rSaIvhw5/XAdInz9hOUaH+gHfhlYey3ezz/iQVtwmPPr2AU\nydxOLOo3mCKwDG2sF+xNyJGFPdoA6fC5v9cNo7wNi13kxFwm+v7l1yLowq3U4F37\nfL5keKnnhIQgGECL+CkSicTzm9ZzaNeEf2jgHIVi1wKBgQDww/Ud4Wwg+JvvuO0a\nSQwOAebYgHeER3k/HYTcr/A/PEfx4xzHk2Vq2hl4t+kB9gX09nPieuljQkihPZA/\nMkNk1hLssAbW06PMCkjya28K64qYCq18OexVHu35oD2RXv/MZ/DwTn4G8b81DrC9\ncXO6kCS88t+JabBGMSuQ2uJdfwKBgQDTDZuLcweTz/Hs/EubOvBeYgKu8Ix67F/r\nJ5EwBJpdutQsbPj1CvewmSarZfXd4DSexvCXhXlb4Y5e5/YIX/ofL/VtGH7lGPzN\nBPNfKyY93rSlZVmOQET3SMsLr6KjuLjRcIGUzMritlLECfIm7eqeBvsm3NvycSqZ\nzUS3J/q8QwKBgQCGmDWGP8ev4uthpxK9eAqKJhwD+kVWKJKqavkkWiLHZw6dNaaY\nF1lB060bpExZMU0BNWlxOd8RAzQRF5Z1DcdJLrejo4AfRm8yGKnRA6gvBaAUARwc\n71CkAUduHlts0hvUDGNQI8EmZqzKn2zEaxEUQZKYIno+mlvV0ZUWRJb5RwKBgEai\nsUJUt16DJCb6sZs8eKI+D0PZgkrJvbiIP5FgmQFxu/06Y4AvsYJLX6PRth4SIcpa\nLr+njlxv+yRMYg2fgajadjuTDTVDzagYVhOt71iZpsAMUZLIc8yHcl1w5PACrOh7\nzQKuH+EMwFqYMZFR40oMcBYrqPlVYrqi9rKOEN7dAoGAX2EqeU1/eJ6BtLFHdjQV\nRrfPCG60eUJ+8qg/OtYxPljzmyIj50NhUXXpNnLV8ymDvy+Uq5f7uHt4tUkB8msz\nPm6eq4WTOg+reztPhOQo/WM1Ge4m1iB/34npiyRyQnqP21jRmzjgWc8kWfHFd+xR\n7tzqr0s54ZnNGCLzVwGudnk=\n-----END PRIVATE KEY-----\n';
    const signature = signer.sign(privateKey, 'base64');
    const encodedSignature = signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    const jwt = `${encodedHeader}.${encodedClaimSet}.${encodedSignature}`;
    
    return jwt
}

const getOAuthToken = (jwt) => {
    return new Promise(
        (resolve, reject) => {
            const option = {
                hostname: 'oauth2.googleapis.com',
                path: `/token?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
                method: 'POST',
                port: 443,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const req = https.request(option, (res) => {
                let result = ''
                res.on('data', data => {
                    result += data;
                });
                res.on('end', () => {
                    resolve(result);
                });
            });

            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        }
    );
}

const getAccessToken = async() => {
    const jwt = crateJWT();
    const oAuthToken = await getOAuthToken(jwt).catch(err => {
        console.log(err);
    });
    const json = JSON.parse(oAuthToken);
    return json
}

module.exports = {
    getAccessToken,
 };