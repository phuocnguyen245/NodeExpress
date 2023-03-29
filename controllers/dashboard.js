
export const getDashboard = async (req, res) => {
  try {
    res.send("Hello")
  } catch (error) {
    res.status(500).json({ message: 'success' });
  }
};
