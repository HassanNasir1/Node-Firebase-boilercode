// utils/validationUtils.js

const isValidEmail = (email) => {
  // Implement email validation logic here
  return /\S+@\S+\.\S+/.test(email);
};

module.exports = {
  isValidEmail,
};
