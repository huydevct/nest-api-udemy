import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'huy@huy.com',
          password: '1234',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: '1234' } as User]);
      },
      // remove: () => {},
      // update: () => {},
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users returns a list of users with the given email', async () => {
    const users = await controller.findAllUsersWithEmail('huy@huy.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('huy@huy.com');
  });

  it('findUser return a single user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async (done) => {
    fakeUserService.findOne = () => null;
    try {
      await controller.findUser('1');
    } catch (error) {
      done();
    }
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'huy@huy.com', password: '1234' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
