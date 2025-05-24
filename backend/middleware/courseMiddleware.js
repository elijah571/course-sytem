export const onlyApprovedCourse = async (req, res, next) => {
  req.onlyApproved === true;
  next();
};
