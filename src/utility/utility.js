export const shortAddress = (address) => {
  let a = address.substring(0, 5);
  let b = address.substring(28, 32);
  let filler = "......";
  console.log("address: ", a + b);
  return a + filler + b;
};
