let cache = null;
let lastFetch = 0;

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  const now = Date.now();
  const fifteenMinutes = 900000;

  if (cache && (now - lastFetch) < fifteenMinutes) {
    return res.status(200).json(cache);
  }

  const page = req.query.page || 1;

  const url = `https://lgdusallc.com/developer-api/diamond?type=certified&page=${page}&key=3555e3505b955d1dcf363ad6f03a8d51ca4e4b3c3b7b`;

  try {

    const response = await fetch(url);
    const json = await response.json();

    // Convert to readable format
    const readable = json.Stock.map(d => ({
      Shape: d.Shape,
      Carat: d.Carat,
      Color: d.Color,
      Clarity: d.Clarity,
      Price: d.Price
    }));

    cache = readable;
    lastFetch = now;

    res.status(200).json(readable);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diamonds" });
  }
}
