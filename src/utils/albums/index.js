const mapDBToModel = ({
  id,
  name,
  year,
  songs,
  createdAt,
  updatedAt,
}) => ({
  id,
  name,
  year,
  songs,
  createdAt,
  updatedAt,
});

module.exports = { mapDBToModel };
