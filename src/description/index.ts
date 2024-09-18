import { classDescriptor, printObj, propDescriptor } from "./descriptor";


@classDescriptor("用户")
class User {
  @propDescriptor("账号")
  userName: string | undefined;
  @propDescriptor("密码")
  passWord: string | undefined;
}

const user = new User()
user.userName = '123'
user.passWord = '123'

printObj(user)
