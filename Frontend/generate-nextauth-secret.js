// generate-nextauth-secret.js
console.log(require('crypto').randomBytes(32).toString('base64'));