// api/weather.js
export default async function handler(req, res) {
    const { city } = req.query;
    const apiKey = process.env.API_KEY; // Your API key
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
  