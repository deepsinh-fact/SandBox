import React from 'react'
import { IoMdRefresh } from 'react-icons/io'

export default function SpinAnimate({ loading }) {
    return (
        <span className='inline-block rounded-lg'>
            <IoMdRefresh className={`text-[18px]  ${loading ? "animate-spin" : ""}`} />
        </span>
    )
}
