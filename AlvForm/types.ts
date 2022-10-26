import type { Sizes } from "../utils/sizeProps";
export const AlvFormProps = {
  title: {
    type: String,
    required: false,
    default: null,
  },
  sections: {
    type: Array<AlvFormSectionType>,
    required: true,
  },
};

export interface AlvFormSectionType {
  title?: string;
  fields: AlvFormInputType[];
}

export interface AlvFormInputType {
  label: String;
  type: AlvFormComponentType;
  children?: AlvFormSectionType[];
  size?: Sizes;
  placeholder?: String;
  options?: Array<[]>;
  value?: unknown;
}

export type AlvFormComponentType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "password";
