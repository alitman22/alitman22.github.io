import argon2 from 'argon2';

const password = process.argv[2];

if (!password || password.length < 10) {
  console.error('Usage: node server/tools/hash-password.mjs "a-strong-password"');
  console.error('Password must be at least 10 characters.');
  process.exit(1);
}

const hash = await argon2.hash(password, {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 3,
  parallelism: 1
});

console.log(hash);
