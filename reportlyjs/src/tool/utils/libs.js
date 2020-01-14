
export const or = (v1, v2) => {
  return v1 ? v1 : v2;
};

export const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
