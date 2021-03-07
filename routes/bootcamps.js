const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  editBootcamp,
  deleteBootcamp,
} = require('../controller/bootcamps');

router
  .route('/')
  .get(getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .put(protect, authorize('publisher', 'admin'), editBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)
  .get(getBootcamp);

module.exports = router;
