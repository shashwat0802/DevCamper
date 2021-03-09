const express = require('express');
// Include other resource router
const courseRouter = require('./courses');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  editBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controller/bootcamps');

// re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

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
