export default function handler(req, res) {
  res.status(200).json({ service: "Compliance API", ok: true });
}
