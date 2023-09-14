import { textInputProps, IInput, TextAreaProps } from "@/Interfaces/fields";
import { IArea } from "@/Interfaces/fields";

export function TextInput({
  label,
  placeholder,
  onChange,
  name,
  ...inputProps
}: textInputProps & IInput) {
  return (
    <div className="relative w-full space-y-2">
      <label className="text-xs mb-4">{label}</label>
      <div className="w-full border-[0.5px] border-gray-400">
        <div className={"absolute p-3 pointer-events-none"}></div>
        <input
          onChange={onChange}
          type={"text"}
          placeholder={placeholder}
          required
          className={
            "w-full h-11 py-1 border-[0.5px] px-8 outline-none text-sm text-lightBlack"
          }
          name={name}
          {...inputProps}
        />
      </div>
    </div>
  );
}

export function TextArea({
  label,
  placeholder,
  name,
  onChange,
  ...otherProps
}: TextAreaProps & IArea) {
  return (
    <span className="space-y-2">
      <label className={"text-xs"}>{label}</label>
      <textarea
        className={
          "w-full py-2 px-4 h-28 border-gray-400 border-[0.5px] outline-none text-sm"
        }
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        required
        {...otherProps}
      />
    </span>
  );
}
