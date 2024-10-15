exports.getProductsController = async (req, res) => {
  try {
    res.status(200).json([
      {
        id: 1,
        name: "Mobile",
        price: 100000,
      },
      {
        id: 2,
        name: "Air pod",
        price: 15000,
      },
      {
        id: 3,
        name: "Smart Watch",
        price: 3000,
      },
    ]);
  } catch (error) {}
};
