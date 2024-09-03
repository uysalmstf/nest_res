import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UsersModule } from "./users.module";
import * as request from 'supertest';
import { CreateUserDto } from "./dto/createUser.dto";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/loginUser.dto";
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { getModelToken } from '@nestjs/mongoose';
import { Users } from '../schemas/user.schema';


const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  // Diğer mock metotlar...
});

describe('first test', () => {

  let app: any;
  let httpServer: any;
  let usersService: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository(), // Mock repository
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
      imports: [Users]
    }).compile();

    app = module.createNestApplication();
    usersService = module.get<UsersService>(UsersService);

    await app.init();
    httpServer = app.getHttpServer();
  });

  describe('createUser', () => {
    it('should create a user', async () => {

      try {
        const createUserRequest: CreateUserDto = new CreateUserDto();
        createUserRequest.password = "102030";
        createUserRequest.username = "uysal";
        const response = await request(httpServer)
          .post('/users/create')
          .send(createUserRequest);

        expect(response.status).toBe(HttpStatus.CREATED);
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  });
});