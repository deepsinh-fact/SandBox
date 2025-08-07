import React, { useId } from "react";
const SelectFild = React.forwardRef(function SelectFild(
  {
    label,
    type = "text",
    extra,
    placeholder,
    variant,
    state,
    disabled,
    restProps,
    options = [],
    defaultValue = "",
    onChange,
    ...props
  },
  ref
) {
  const id = useId();
  const handleChange = (e) => {
    // Call the passed onChange function if exists
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
      <div className="relative mt-2">
        <select
          className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
            disabled
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
          placeholder={placeholder}
          ref={ref}
          disabled={disabled || options.length === 0}
          onChange={handleChange}
          {...props}
          id={id}
        >
          <option defaultValue value={defaultValue}>
            All
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});
export default SelectFild;
