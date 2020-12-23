export const termGeneration = (min: number, max: number, step: number) => {
  const res: any = [];
  if (step) {
    for (let i = min; i <= max; i += step) {
      res.push({
        order: 1,
        title: String(i),
        uuid: String(i),
      });
    }
    return res;
  }
  return res;
};
