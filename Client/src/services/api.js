import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchLogs = (page = 1, limit = 20) =>
  axios.get(`${API_BASE}/logs?page=${page}&limit=${limit}`);

export const fetchEventCounts = () =>
  axios.get(`${API_BASE}/event-count`);

export const fetchEventsByHour = () =>
  axios.get(`${API_BASE}/events-by-hour`);
