import { useCallback } from "react";

const useLoadJson = (path: string) => {
  return useCallback(() => {
    return fetch(path)
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
};

export default useLoadJson;
