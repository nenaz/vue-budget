export const getExpires = (milliseconds = 1000): Date => (
  new Date(Date.now() + milliseconds)
);
