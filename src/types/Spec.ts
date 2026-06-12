export type Spec = {
  title: string;
  value: string;
};

export type UnfilteredSpec = Omit<Spec, 'value'> & {
  value: string | undefined;
};
