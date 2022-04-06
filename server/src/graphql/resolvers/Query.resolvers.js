const Query = {
  tours: async (_, __, { prisma }) => {
    const allTours = await prisma.tour.findMany();
    return allTours;
  },
  tour: async (_, args, { prisma }) => {
    const { id } = args;
    const tour = await prisma.tour.findUnique({
      where: { id },
    });
    return tour;
  },
};

module.exports = { Query };
