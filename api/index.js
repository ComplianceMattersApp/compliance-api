export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://app.compliancemattersca.com");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }

  res.status(200).json({ service: "Compliance API", ok: true });
}
