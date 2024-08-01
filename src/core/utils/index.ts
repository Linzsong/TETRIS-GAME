
/**
 * 生成一个随机数
 */
export const getRandom = (min: number, max: number) => {
  let dec = max - min
  return Math.floor(Math.random() * dec + min)
}