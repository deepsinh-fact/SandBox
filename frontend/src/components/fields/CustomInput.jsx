import React, { useId } from 'react'
import { FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { TBSelector } from 'Store/Reducers/TBSlice';


const CustomInput = React.forwardRef(function CustomInput({
    label,
    type = "text",
    placeholder,
    state,
    disabled,
    RegEx,
    imputName,
    className,
    ...extra

}, ref) {
    const id = useId();
    const { isloading } = useSelector(TBSelector)
    return (
        <input
            className={className}
            placeholder={placeholder}
            type={type}
            ref={ref}
            disabled={disabled || isloading}
            {...extra}
            id={id}
        />

    )

})
export default CustomInput;