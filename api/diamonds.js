// Simple caching to avoid LGD API rate limits
let cache = null;
let lastFetch = 0;

export default async function handler(req, res) {
  // Allow Shopify pages to fetch this API
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const now = Date.now();
  const fifteenMinutes = 900000; // 15 minutes

  // Return cached data if it's still valid
  if (cache && (now - lastFetch) < fifteenMinutes) {
    return res.status(200).json(cache);
  }

  const page = req.query.page || 1;

  const url = `https://lgdusallc.com/developer-api/diamond?type=certified&page=${page}&key=3555e3505b955d1dcf363ad6f03a8d51ca4e4b3c3b7b`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    cache = data;
    lastFetch = now;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diamonds", details: error.message });
  }
}
