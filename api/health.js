export default function handler(req, res) {
res.setHeader("Access-Control-Allow-Origin", "https://app.compliancemattersca.com");
res.setHeader("Vary", "Origin");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  res.status(200).json({ status: "ok" });
}
