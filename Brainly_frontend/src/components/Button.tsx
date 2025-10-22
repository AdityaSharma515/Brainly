import type { ReactElement } from "react"

interface ButtonProps {
  text:string,
  StartIcon?: ReactElement,
  variant:"primary"|"secondary",
  size:"sm"|"md"|"lg",
  onClick:()=>void
}

const variantclasses={
  "primary":"text-indigo-600 bg-indigo-100 hover:bg-indigo-200 ",
  "secondary":"text-white bg-indigo-600 hover:bg-indigo-800"
}

const sizeclasses={
  "sm":"px-2 py-1 text-sm ",
  "md":"px-4 py-2 text-base",
  "lg":"px-4 py-2 text-lg w-full "
}
const defaultStyles="border border-transparent w-40  font-normal rounded-md flex items-center justify-center gap-2  transition-colors "
const Button = ({text,StartIcon,variant,size,onClick}:ButtonProps) => {
  return (
    <button onClick={onClick} className={`${variantclasses[variant]} ${sizeclasses[size]} ${defaultStyles}`}>{StartIcon} {text}</button>
  )
}

export default Button