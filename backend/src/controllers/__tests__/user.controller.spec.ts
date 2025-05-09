import { registerUser, loginUser } from '../user.controller';
import { prisma } from '../../prisma';

jest.mock('../../prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

describe('User Controller', () => {
  const mockReq = (body: any) => ({ body } as any);
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should register a user successfully', async () => {
    const req = mockReq({
      email: 'test@example.com',
      fullName: 'Test User',
      address: '123 Test St',
      carPlate: 'TEST123',
    });
    const res = mockRes();

    (prisma.user.create as jest.Mock).mockResolvedValue(req.body);

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should login a user successfully', async () => {
    const req = mockReq({
      email: 'test@example.com',
      carPlate: 'TEST123',
    });
    const res = mockRes();

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(req.body);

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});
