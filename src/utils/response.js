exports.success = (res, data) => {
  return res.status(200).json({
    status: "success",
    data,
    meta: {
      timestamp: Date.now()
    }
  });
};

exports.notFound = (res, message = "Not found") => {
  return res.status(404).json({
    status: "error",
    message
  });
};

exports.error = (res, message = "Internal server error") => {
  return res.status(500).json({
    status: "error",
    message
  });
};
