const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  editBootcamp,
  deleteBootcamp,
} = require('../controller/bootcamps');

router.route('/').get(getBootcamps).post(protect, createBootcamp);

router
  .route('/:id')
  .put(protect, editBootcamp)
  .delete(protect, deleteBootcamp)
  .get(getBootcamp);

module.exports = router;
