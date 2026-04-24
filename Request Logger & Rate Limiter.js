
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Advanced Concept: In-memory Rate Limiter
const requestCounts = {};
const RATE_LIMIT = 10; // Max requests per minute

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requestCounts[ip]) {
        requestCounts[ip] = { count: 1, startTime: now };
    } else {
        requestCounts[ip].count++;
    }

    // Reset count after 1 minute
    if (now - requestCounts[ip].startTime > 60000) {
        requestCounts[ip] = { count: 1, startTime: now };
    }

    if (requestCounts[ip].count > RATE_LIMIT) {
        return res.status(429).send('Too many requests. Try again in a minute.');
    }
    next();
};

// Custom Logger Middleware
app.use((req, res, next) => {
    const entry = `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.url}\n`;
    console.log(entry.trim());
    logStream.write(entry);
    next();
});

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send('<h1>Advanced Middleware Server</h1><p>Your requests are being logged and rate-limited.</p>');
});

// View logs endpoint
app.get('/logs', (req, res) => {
    const logs = fs.readFileSync(path.join(__dirname, 'access.log'), 'utf8');
    res.header('Content-Type', 'text/plain').send(logs);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

