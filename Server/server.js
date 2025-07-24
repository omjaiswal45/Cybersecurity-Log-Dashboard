const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors({
  origin:'https://your-frontend-domain.com'
}));

// Load and parse log file
const logs = JSON.parse(fs.readFileSync(path.join(__dirname, 'sample_siem_log.jsonl'), 'utf-8'));

  
// Paginated logs API
app.get('/api/logs', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({ logs: logs.slice(start, end), total: logs.length });
});

// Bar chart data: event count per event_type
app.get('/api/event-count', (req, res) => {
  const counts = {};
  logs.forEach(log => {
    counts[log.event_type] = (counts[log.event_type] || 0) + 1;
  });
  res.json(counts);
});

// Line chart data: events grouped by hour
app.get('/api/events-by-hour', (req, res) => {
  const hourly = {};
  logs.forEach(log => {
    const hour = new Date(log.timestamp).toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
    hourly[hour] = (hourly[hour] || 0) + 1;
  });
  res.json(hourly);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
