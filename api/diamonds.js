export default async function handler(req, res) {

  const page = req.query.page || 1;

  const url = `https://lgdusallc.com/developer-api/diamond?type=certified&page=${page}&key=3555e3505b955d1dcf363ad6f03a8d51ca4e4b3c3b7b`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({ error: "Failed to fetch diamonds" });

  }

}
