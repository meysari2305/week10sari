const getAllTransaction = async (req, res) => {
  try {
    const transaction = await req.db.collection('transaction').find().toArray();
    res.status(200).json({
      message: 'transaction succesfully retrieved',
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  const { name, status, amount } = req.body;

  try {
    const newTransaction = await req.db.collection('transaction').insertOne({ name, status, amount });
    res.status(200).json({
      message: 'transaction succesfully',
      data: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Patch or transfer Approval
const transferApproval = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  console.log(req.query, `<=================== STATUS ==================`);

  const statusUpdate = await db.collection('transaction').updateOne({ _id: new ObjectId(id) }, { $set: { status: status } });

  res.status(200).json({
    message: 'success',
    data: statusUpdate,
  });
};

module.exports = {
  getAllTransaction,
  createTransaction,
  transferApproval,
};
