require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  env: {
    BASE_URL_PRISMA_EXAMPLE: process.env.BASE_URL_PRISMA_EXAMPLE,
  },
};
