// Admin has full access to everything, including Shipper routes
export const isAdmin = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(403).json({ message: "User is not authenticated" });
  }

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this resource" });
  }

  next();
};

//  Only allow fellow access
export const isFellow = async (req, res, next) => {
  const user = req.user;

  if (user.role !== "fellow") {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this resource" });
  }

  next();
};
