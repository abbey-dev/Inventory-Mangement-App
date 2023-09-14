import {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export interface baseInputProps<T extends Element> {
  name?: string;
  label: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<T>) => void;
}

export type IFormElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export interface textInputProps extends baseInputProps<HTMLInputElement> {
  img?: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
}

export type IInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface TextAreaProps extends baseInputProps<HTMLTextAreaElement> {
  placeholder: string;
}

export type IArea = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
