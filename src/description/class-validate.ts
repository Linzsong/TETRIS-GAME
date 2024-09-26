/**
 * class-validator 用于类的校验库
 */
import "reflect-metadata";
import { IsNotEmpty, validate, MinLength, MaxLength, Min, Max } from "class-validator"

class RegUser {
    @IsNotEmpty({ message: "账号不可以为空" })
    @MinLength(5, { message: "账号必须至少有5个字符" })
    @MaxLength(12, { message: "账号最多12个字符" })
    loginId: string | undefined

    loginPwd: string | undefined

    @Min(0, { message: "年龄的最小值是0" })
    @Max(100, { message: "年龄的最大值是100" })
    age: number | undefined
    gender: "男" | "女" | undefined
}

const post = new RegUser();
post.loginId = "22";
post.age = -1;

validate(post).then(errors => {
    console.log(errors);
})