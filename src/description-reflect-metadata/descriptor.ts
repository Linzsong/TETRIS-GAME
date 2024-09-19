// 使用 reflect-metadata 对日志装饰器进行改造

// const propKey = 'descriptor'
// 更好的写法
const propKey = Symbol.for("descriptor");

export function classDescriptor(des: string) {
  return Reflect.metadata(propKey, des);
  // return function (trage: any) {
  //   trage.prototype.$classDescriptor = des;
  // };
}

export function propDescriptor(des: string) {
  return Reflect.metadata(propKey, des);
  // return function (trage: any, propName: string) {
  //   if (!trage.$propDescriptor) {
  //     trage.$propDescriptor = [];
  //   }
  //   trage.$propDescriptor.push({
  //     propName: propName,
  //     propDes: des,
  //   });
  // };
}

export function printObj(obj: any) {
  const cons = Object.getPrototypeOf(obj).constructor;    // 注意这里是 .constructor

  if (!Reflect.hasMetadata(propKey, cons)) {
    // 没有则打印方法名
    console.log(cons.constructor.name);
  } else {
    console.log(Reflect.getMetadata(propKey, cons));
  }

  for (const key in obj) {
    if (Reflect.hasMetadata(propKey, obj, key)) {
      const propDes = Reflect.getMetadata(propKey, obj, key);
      console.log(`${propDes}: ${obj[key]}`);
    } else {
      console.log(`${String(propKey)}: ${obj[key]}`);
    }
  }

  // if (!obj.$classDescriptor) {
  //   // 没有则打印方法名
  //   console.log(Object.getPrototypeOf(obj).constructor.name);
  // } else {
  //   // 正常打印类的描述
  //   console.log(obj.$classDescriptor);
  // }

  // if (!obj.$propDescriptor) {
  //   obj.$propDescriptor = [];
  // }
  // for (const key in obj) {
  //   if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //     const trage = obj.$propDescriptor.find((p: any) => p.propName === key);
  //     if (trage) {
  //       console.log(`${trage.propDes}: ${obj[key]}`);
  //     } else {
  //       console.log(`${key}: ${obj[key]}`);
  //     }
  //   }
  // }
}
