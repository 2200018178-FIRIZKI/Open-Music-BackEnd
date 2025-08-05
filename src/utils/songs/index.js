const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  createdAt,
  updatedAt,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  createdAt,
  updatedAt,
});

module.exports = { mapDBToModel };
