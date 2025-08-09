export default function handler(req, res) {
  res.status(200).json({ version: "v0.1", env: process.env.VERCEL_ENV || "production" });
}
