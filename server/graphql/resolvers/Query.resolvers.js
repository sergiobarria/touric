const { prisma } = require('../../services/prismaClient');

const Query = {
  tours: async () => {
    const allTours = await prisma.tour.findMany();
    return allTours;
  },
  tour: async (_, args) => {
    const { id } = args;
    const tour = await prisma.tour.findUnique({
      where: { id },
    });
    return tour;
  },
};

module.exports = { Query };
