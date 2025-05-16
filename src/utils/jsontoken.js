import jwt from "jsonwebtoken";

export function generateToken(payload) {
  try {
    if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY is missing");

    // Sign the token with the payload and secret key, set expiration
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30d" });
  } catch (err) {
    console.error(
      "Token generation error:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

export const verifyToken = (token) => {
  try {
    if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY is missing");
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error(
      "Invalid or expired token:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
};
