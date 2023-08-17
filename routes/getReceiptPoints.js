import { data } from "./process.js";

const getReceiptPoints = async (req, res) => {
  const id = req.params.id;
  if (!(id in data)) {
    return res.status(404).json();
  }
  return res.json({
    points: data[id],
  });
};

export { getReceiptPoints };
