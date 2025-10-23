// Basic auth middleware placeholder
// Replace with actual Clerk verification if needed
const requireAuth = (req, res, next) => {
  // For now, just pass through
  // TODO: Implement proper authentication
  next();
};

module.exports = { requireAuth };