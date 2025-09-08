const loansModel = require('../../models/book-loans-model');


async function getAllLoans(req, res) {
  try {
    const loans = await loansModel.getAllLoans();

    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error getting loans', error: error.message });
  }
}


async function getLoan(req, res) {
  const loanId = req.params.id;

  try {
    const loan = await loansModel.getLoan(loanId);

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
}



module.exports = { getAllLoans, getLoan };
