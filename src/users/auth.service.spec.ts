import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.sevice";
import { User } from "./user.entity";


describe('authService', ()=>{
    
    let service : AuthService;
    let fakeUserSevice :Partial<UsersService>
    beforeEach(async()=>{
        let users :  User[] = [];
         fakeUserSevice   = {
            find : (email : string)=> {
                const user = users.filter((user)=> user.email === email)
                return Promise.resolve(user) 
            },
            CreateUser : (email, password) => {
            const user = {id : Math.floor(Math.random() *999 ) , email , password} as User; 
            users.push(user);
            return Promise.resolve(user)
        }
            
        }
            const Module : TestingModule = await Test.createTestingModule({
                providers : [ AuthService , 
                { 
                    provide : UsersService , 
                    useValue : fakeUserSevice
                }
                ]
            }).compile();
            service = Module.get(AuthService);
    })


    it('create instance of the auth service ' , ()=>{
    expect(AuthService).toBeDefined();
    })

    it('create hash of password test' , async()=>{
        const user = await service.signup('aaa@aaa.com' , 'abcd');
        expect(user.password).not.toEqual('abcd');
        const [salt , hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined()

    }) ; 

    it('throw an error if the user signup with email is already exist ' , async()=>{
        try{
        await service.signup("aaa@aaa.com" , 'ad')
        } catch(err) { 
          console.log(err);
        }

    })

    it('check sign in ' , async ()=>{
        try{
        await service.signin("aaa@aaa.com" , 'abcd')
        } catch(err) { 
         console.log(err);
        }
    })
    jest.setTimeout(20000)
    it('throws error if the password is not correct' , async ()=>{
    // fakeUserSevice.find = ()=> Promise.resolve([{id : 1 , email : 'test@test.com'  , password : 'a1684a094374e83e.37c3b30292fca13fdbdcd8f550ecb1314d01eab821a70da814d3d92ba6889e61'} as User]);
    //     const user  = await service.signin("test@test.com" , 'password');
    //     expect(user).toBeDefined()
    //     const [salt , hashed] = user.password.split('.');
    //     expect(salt).toBeDefined()
    //     expect(hashed).toBeDefined()
            await service.signup("test@test.com" , 'password')
         const user  = await service.signin("test@test.com" , 'pass0word1');
         expect(user).toBeDefined()
    })
})

