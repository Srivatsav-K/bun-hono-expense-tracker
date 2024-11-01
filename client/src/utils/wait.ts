export const wait = async (timeMs: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs);
  });
};
