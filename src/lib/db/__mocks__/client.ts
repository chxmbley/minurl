const clientMock = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  minifiedUrl: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
  redirect: {
    create: jest.fn(),
  },
};

export default clientMock;
