const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/toggl', async (req, res) => {
  try {
    const { workspaceId, cardName, start_date, end_date } = req.body;

    const togglRes = await axios.post(`https://api.track.toggl.com/reports/api/v3/workspace/${workspaceId}/search/time_entries/totals`, {
      description: cardName,
      start_date: start_date,
      end_date: end_date
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from('<email>:<password>').toString('base64')}`
      }
    });

    res.json(togglRes.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
