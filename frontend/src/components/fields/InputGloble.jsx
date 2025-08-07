import React, { useId } from 'react'
import { FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { TBSelector } from 'Store/Reducers/TBSlice';


const InputGloble = React.forwardRef(function InputGloble({
    label,
    type = "text",
    extra,
    placeholder,
    state,
    disabled,
    RegEx,
    imputName,
    name = "search",
    ...props
}, ref) {
    const id = useId();
    const { isloading } = useSelector(TBSelector)
    return (
        <div className={`relative mt-[3px] flex h-[70px] w-full flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-full md:flex-grow-0 md:gap-1 xl:w-full xl:gap-2`}>
            <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-full">
                <p className="pl-3 pr-2 text-xl">
                    <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
                </p>
                <input
                    className={`block px-2 h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-full ${disabled
                        ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                        : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                : "border-gray-200 dark:!border-white/10 dark:text-white"
                        }`}
                    placeholder={placeholder}
                    type={type}
                    ref={ref}
                    disabled={disabled || isloading}
                    {...props}
                    id={id}
                    name={name}
                />
            </div>
        </div>
    )

})
export default InputGloble;