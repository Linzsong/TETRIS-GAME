// import { classDescriptor, printObj, propDescriptor } from "./descriptor";
import { classDescriptor, printObj, propDescriptor } from "../description-reflect-metadata/descriptor";


@classDescriptor("用户")
class User {
  @propDescriptor("账号")
  userName: string | undefined;
  @propDescriptor("密码")
  passWord: string | undefined;
}

const user = new User()
user.userName = '123'
user.passWord = '456'

printObj(user)
