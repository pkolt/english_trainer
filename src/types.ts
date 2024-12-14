import { Control, FieldValues, Path } from 'react-hook-form';

import type { JSX } from 'react';

export interface Choice {
  label: string;
  value: string;
  count?: number;
}

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export type FormField<P = unknown> = <T extends FieldValues>(args: FormFieldProps<T> & P) => JSX.Element;
