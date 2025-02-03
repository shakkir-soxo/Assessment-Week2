import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceDto } from './dto/user.service.dto';


describe('UserController', () => {                // Test suite for usercontroller
  let userController: UserController;      
  let userService:UserService

  beforeEach(async () => {                                         // Before each test create a testing module with user controll and mock user service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],  // Register user controller
      providers:[{
        provide:UserService,         // Mock the user service 
        useValue:{
          register:jest.fn()        // Mock the register method of user service
        }
      }]
    }).compile();

    userController = module.get<UserController>(UserController); // Get the instance of user controller
    userService = module.get<UserService>(UserService)  // Get mocked instance of user service 
  });

  it('should be defined', () => {             // test case for check user controller is defiend
    expect(userController).toBeDefined();    // checking user controller is properley defined
  });
  
  describe('register',  () => {   // Describe the block for register functionality
    it('it should register the user and return the correct response', async () => {
          const registerData = {           // sample data for user  registration request
            userName:'blah',
            email:'blah123@gmail.com',
            password:'blah123'
          }

          const result:UserServiceDto= {      // mocked result of register method from user service
              id:1,     
              userName:'blah',
              email:'blah123@gmail.com'
          } 

          jest.spyOn(userService,'register').mockResolvedValue(result)  // Spy on the register method and  mock its resolved value with result
          const response = await userController.register(registerData)  // Call the register method on the controller to mock the register data
         
          expect(response).toEqual({                      // Check response matches the expected format of data 
            message:'User created successfully',
            user:{
              id:1,
              userName:'blah',
              email:'blah123@gmail.com'
            }
          })

          
    }) 
  })
});


