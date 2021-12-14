import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the user service
    const users: User[] = [];
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = { 
          id: Math.floor(Math.random()*999999), 
          email, 
          password 
          } as User;
        users.push(user);
        return Promise.resolve(user);
      }
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup('huy@huy.com', '1234');

    expect(user.password).not.toEqual('1234');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user sign up with email that is in use', async (done) => {
    // fakeUserService.find = () =>
    //   Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await service.signup('test@test.com', '1234');
    try {
      await service.signup('test@test.com', '1234');
    } catch (error) {
      done();
    }
  });

  it('throws if sign in is called with an unused email', async (done) => {
    try {
      await service.signin('test@test.com', '1234');
    } catch (error) {
      done();
    }
  });

  it('throws if an invalid password is provided', async (done) => {
    // fakeUserService.find = () =>
    //   Promise.resolve([{ email: 'huy@huy.com', password: '12' } as User]);
    await service.signup('huy@huy.com', '123');
    try {
      await service.signin('huy@huy.com', '1234');
    } catch (error) {
      done();
    }
  });

  it('return a user if correct password is provided', async () => {
    // fakeUserService.find = () =>
    //   Promise.resolve([
    //     {
    //       email: 'huy@huy.com',
    //       password:
    //         'd3d5039c82e741b2.75f24fb8990ca619b173919ac3840606cd3565da02097af299d18e4002a609b6',
    //     } as User,
    //   ]);
    await service.signup('huy@huy.com', 'mypassword');
    
    const user = await service.signin('huy@huy.com', 'mypassword');
    expect(user).toBeDefined();
    // const user = await service.signup('huy@huy.com', 'mypassword');
    // console.log(user);
  });


});
