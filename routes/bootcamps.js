const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'get all bootcamps' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'get single bootcamp' });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'add a bootcamp' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'edit a bootcamp' });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'delete a bootcamp' });
});

module.exports = router;
