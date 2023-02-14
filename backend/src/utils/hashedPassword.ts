const { createHmac } = require("crypto");
const hashedPasswordSecretKey = process.env.PASSWORD_SECRET_KEY;

export default function (password: string): string {
  const hash = createHmac("sha256", hashedPasswordSecretKey)
    .update(password)
    .digest("hex");

  return hash;
}
