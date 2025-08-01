module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access denied: insufficient permissions' });
    }

    next();
  };
};
