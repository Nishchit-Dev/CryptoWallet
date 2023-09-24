import { useEffect, useState } from "react";

export const useSlicer = (strKey: string) => {
  const [privateKey, setPrivateKey] = useState([]);

  useEffect(() => {
    setPrivateKey(strKey.split(" "));

    return () => {
      privateKey;
    };
  });

  return privateKey
};
