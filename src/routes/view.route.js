const express = require('express');
const path = require('path');

const router = express.Router();

// Serve the HTML test page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.tpl.html'));
});

router.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.tpl.html'));
});

module.exports = router;
