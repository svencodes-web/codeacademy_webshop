const registerUserMap = (userId, email, hashedPassword) => {
  return {
    id: userId,
    email: email,
    password_hash: hashedPassword,
  };
};

export { registerUserMap };
