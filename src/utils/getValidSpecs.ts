import type { UnfilteredSpec } from '../types/Spec';

export const getValidSpecs = (specs: UnfilteredSpec[]) => {
  return specs.filter((spec): spec is typeof spec & { value: string } => spec.value !== undefined);
};
