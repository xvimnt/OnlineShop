const xController = {};

xController.getHelloWorld = async (req,res) => {
  res.json({
    status: "api sirve"
  })
};

module.exports = xController;