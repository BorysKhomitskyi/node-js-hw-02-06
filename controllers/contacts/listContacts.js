const { Contact } = require('../../models');
const { ctrlWrapper } = require('../../utils');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;

  const skip = (page - 1) * limit;

  const searchQuery = { owner };
  if (favorite === 'true') searchQuery.favorite = true;
  if (favorite === 'false') searchQuery.favorite = false;

  const result = await Contact.find(searchQuery, '', { skip, limit });
  const total = await Contact.count(searchQuery);

  res.status(200).json({
    result,
    total,
  });
};

module.exports = ctrlWrapper(listContacts);
