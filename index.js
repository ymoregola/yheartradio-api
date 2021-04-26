import express from 'express';
import iheart from 'iheart';

const app = express();
const PORT = 3000;

app.use(function (req, res, next) {
    res.header('access-control-allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
    next();
});

app.get('/station/:genre', async (req, res) => {
    const matches = await iheart.search(req.params.genre);
    // set a randomized station/number out of the available stations
    const randomStation = Math.floor(Math.random() * matches.stations.length);
    const station = matches.stations[randomStation];
    const url = await iheart.streamURL(station);
    res.json({ logo: station.newlogo, url: url });
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
