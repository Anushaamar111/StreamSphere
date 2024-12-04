const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err); //passing the err to the middleware
    });
  }; //next is a middleware
};

export { asyncHandler };
