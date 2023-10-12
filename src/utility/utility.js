export const shortAddress = (address) => {
  let a = address.substring(0, 5);
  let b = address.substring(28, 32);
  let filler = "......";
  console.log("address: ", a + b);
  return a + filler + b;
};

export const CustomShortAddress = (address,LeftChars,RightChars) => {
  let a = address.substring(0, LeftChars || 5);
  let b = address.substring(32 - RightChars || 28, 32);
  let filler = "......";
  console.log("address: ", a + b);
  return a + filler + b;
};
