// // Custom components
// import React, { useId } from "react";

// const TextField = React.forwardRef(function TextField(props, ref) {
//   const { label, extra, placeholder, cols, rows, state, disabled } = props;
//   const id = useId();
//   return (
//     <div className={`${extra}`}>
//       <label
//         htmlFor={id}
//         className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white"
//       >
//         {label}
//       </label>
//       <div>
//         <textarea
//           cols={cols}
//           rows={rows}
//           placeholder={placeholder}
//           className={`flex w-full items-center justify-center rounded-xl border bg-white/0 pl-3 pt-3 text-sm outline-none ${disabled === true
//             ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
//             : state === "error"
//               ? "!border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
//               : state === "success"
//                 ? "!border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
//                 : disabled === true
//                   ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
//                   : "border-gray-200 dark:!border-white/10 dark:text-white"
//             }`}
//           ref={ref}
//           name={id}
//           disabled={disabled}
//           id={id}
//         />
//       </div>
//     </div>
//   );
// })

// export default TextField;


import React, { useId, useState } from 'react';
const TextField = React.forwardRef(function TextField({
  label,
  cols,
  rows,
  extra,
  placeholder,
  variant,
  state,
  disabled,
  restProps,
  resizenone,
  ...props
}, ref) {
  const id = useId();

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"}`}
      >
        {label}
      </label>
      <div className="relative mt-2">
        <textarea
          className={`flex ${resizenone ? "resize-none" : ""} w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${disabled
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                : "border-gray-200 dark:!border-white/10 dark:text-white"
            }`}
          placeholder={placeholder}
          cols={cols}
          rows={rows}
          ref={ref}
          disabled={disabled}
          {...props}
          id={id} />
      </div>
    </div>
  )

})
export default TextField;