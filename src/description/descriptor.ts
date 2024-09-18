export function classDescriptor(des: string) {
  return function (trage: any) {
    trage.prototype.$classDescriptor = des;
  };
}

export function propDescriptor(des: string) {
  return function (trage: any, propName: string) {
    if (!trage.$propDescriptor) {
      trage.$propDescriptor = [];
    }
    trage.$propDescriptor.push({
      propName: propName,
      propDes: des,
    });
  };
}

export function printObj(obj: any) {
  if (!obj.$classDescriptor) {
    // 没有则打印方法名
    console.log(Object.getPrototypeOf(obj).constructor.name);
  } else {
    // 正常打印类的描述
    console.log(obj.$classDescriptor);
  }

  if (!obj.$propDescriptor) {
    obj.$propDescriptor = [];
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const trage = obj.$propDescriptor.find((p: any) => p.propName === key);
      if (trage) {
        console.log(`${trage.propDes}: ${obj[key]}`);
      } else {
        console.log(`${key}: ${obj[key]}`);
      }
    }
  }
}
