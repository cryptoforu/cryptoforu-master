export interface LabelProps {
  name: string;
  label?: string;
  errors?: {
    [x: string]: string;
  };
}

type SelectOptions = {
  id: string | number;
  name: string;
  label?: string;
};
export interface FieldProps extends LabelProps {
  type?: string;
  placeholder?: string;
  options?: Array<SelectOptions>;
  [x: string]: unknown;
}
