/**
 * class-transformer 将平面对象转换为类对象
 */
import { plainToClass, Type } from "class-transformer";
import axios from "axios";

class User {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;

  @Type(() => Number)
  age!: number;

  getName() {
    return this.firstName + " " + this.lastName;
  }

  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}

axios
  .get("https://api.myjson.com/bins/1b59tw")
  .then((resp) => resp.data)
  .then((users) => {
    const usersClassArray = plainToClass(User, users, { excludeExtraneousValues: true });
    for (const u of usersClassArray) {
      console.log(typeof u.age, u.age);
    }
  });
