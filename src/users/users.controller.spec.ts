import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/users/auth.sevice';
import { User } from 'src/users/user.entity'; 

describe('UsersController', () => {
  let controller: UsersController;
    let fakeUserSevice  : Partial<UsersService>;
  let fakeAuhService : Partial<AuthService>

  beforeEach(async () => {
        fakeAuhService  = {
      signin : (email : string, password :  string)=> {
        return Promise.resolve({id : 1 , email ,password} as User)
      },
      // signup(email, password) {
        
      // },
    };
    fakeUserSevice = {
      findone(id : number) {
        return Promise.resolve({id , email : 'hgfds' ,password : 'gfds' } as User)
      },
      find(email : string) {
        return Promise.resolve([{id : 1 , email , password : 'gfhdjskl'} as User])
      },
      // remove(id) {
        
      // },
      // update(id, attrs) {
        
      // },
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers : [{
        provide : UsersService , 
        useValue : fakeUserSevice
      } , {
        provide  : AuthService, 
        useValue : AuthService
      }
    ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('check findall method ', async ()=>{
    const user = await controller.findAll('asd@asd.com');
    expect(user.length).toEqual(1);
    expect(user[0].email).toEqual('asd@asd.com')
  });
  it('check find user with id ' , async()=>{
    const user = await controller.findUser('1');
    expect(user).toBeDefined()
  } )
  it('make sure findUser wil throw exption if user not found ' , async ()=>{
  fakeUserSevice.find = (email : string)=> Promise.resolve([]);
  try{const user = await controller.findUser('1');}
  catch(err) { 
  console.log(err );
  }})
  it('check for implemet sign in and return user ' , async ()=>{
    let session = {userId : -20}
    const user = await controller.signin({email: 'email', password : 'password'} , session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);


  })
})
