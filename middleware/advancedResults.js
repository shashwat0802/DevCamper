const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Create copy of req.query
  const reqQuery = { ...req.query };

  // Feilds to exclude
  const removeFeilds = ['select', 'sort', 'pageNo', 'pageSize'];

  // Loop over removeFeilds and exclude the from reqQuery
  removeFeilds.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create Operators like $gt etc
  queryStr = queryStr.replace(
    /\b'gt|gte|lt|lte|in'\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Feild
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const pageNo = parseInt(req.query.pageNo, 10) || 1;

  const pageSize = parseInt(req.query.pageSize, 10) || 25;

  const startIndex = (pageNo - 1) * pageSize;

  const endIndex = pageNo * pageSize;

  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(pageSize);

  // populate if any
  if (populate) {
    query = query.populate(populate);
  }

  // Execute Query
  const result = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      pageNo: pageNo + 1,
      pageSize,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      pageNo: pageNo - 1,
      pageSize,
    };
  }

  res.advancedResults = {
    success: true,
    count: result.count,
    pagination,
    data: result,
  };

  next();
};

module.exports = advancedResults;
