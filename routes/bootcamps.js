const express = require('express');
const router = express.Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  editBootcamp,
  deleteBootcamp,
} = require('../controller/bootcamps');

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id').put(editBootcamp).delete(deleteBootcamp).get(getBootcamp);

module.exports = router;
