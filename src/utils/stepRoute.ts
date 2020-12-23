export const getStepRoute = (stepNumber: number) => {
  const steps = [
    {
      route: 'balance',
    },
    {
      route: 'income',
    },
    {
      route: 'virtual-card',
    },
    {
      route: 'credit-sign',
    },
    {
      route: 'info',
    },
  ];

  return steps[stepNumber].route;
};
