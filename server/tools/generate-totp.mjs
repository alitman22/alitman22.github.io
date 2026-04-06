import speakeasy from 'speakeasy';
import qrcode from 'qrcode-terminal';

const accountName = process.argv[2] || 'portfolio-admin';
const issuer = process.argv[3] || 'AliPortfolioStats';
const secret = speakeasy.generateSecret({
	name: `${issuer}:${accountName}`,
	issuer
});

console.log('\n=== Add this to your .env ===');
console.log(`ANALYTICS_ADMIN_TOTP_SECRET=${secret.base32}`);
console.log('\n=== Scan this QR code with Google Authenticator ===');
qrcode.generate(secret.otpauth_url, { small: true });
console.log('\nIf the QR code is hard to scan, manually enter this key in the app:');
console.log(`Key: ${secret.base32}`);
