import "reflect-metadata";

@Reflect.metadata("a", "类A")
@Reflect.metadata("b", "类B")
class A {
  @Reflect.metadata('prop', "props 属性")
  prop1: string | undefined;
}

let obj = new A();
obj.prop1 = 'aaa'

console.log(Reflect.getMetadata("a", A));
console.log(Reflect.getMetadata("b", A));
console.log(Reflect.getMetadata("prop", obj, 'prop1'));
