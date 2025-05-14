import { Eye, EyeOff } from 'lucide-react';
import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { clsx } from 'clsx';

type LabelPosition = 'inline' | 'newLine';
type IconPosition = 'left' | 'right';
type Variant = 'default' | 'underline';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: LabelPosition;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  isPwd?: boolean;
  variant?: Variant;
  
}

export const Input = ({
  label,
  labelPosition = 'newLine',
  icon,
  iconPosition = 'left',
  isPwd = false,
  type = 'text',
  variant = 'default',
  className,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = isPwd ? (showPassword ? 'text' : 'password') : type;

  const borderBase = variant === 'underline'
    ? 'border-b-2 focus-within:border-primary'
    : 'border rounded-md focus-within:border-blue-500';

  const labelClasses = clsx(
    'text-sm font-medium mb-1',
    labelPosition === 'inline' && 'mr-2 mb-0 whitespace-nowrap'
  );

  const wrapperClasses = clsx(
    'flex',
    labelPosition === 'inline' ? 'items-center gap-2' : 'flex-col gap-1',
    focused && 'text-gray-700'
  );

  const inputWrapperClasses = clsx(
    'flex items-center w-full px-1 py-1 transition-colors duration-200',
    borderBase,
    variant === 'underline' && 'border-gray-300',
    variant === 'default' && 'border-gray-300',
    focused && '',
    'bg-white',
    'relative',
    className
  );

  const inputClasses = clsx(
    'bg-transparent w-full outline-none text-gray-700 placeholder:text-gray-400',
    icon && iconPosition === 'left' && 'pl-2',
    icon && iconPosition === 'right' && 'pr-2'
  );

  return (
    <div className={wrapperClasses}>
      {label && <label className={labelClasses}>{label}</label>}
      <div
        className={inputWrapperClasses}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {icon && iconPosition === 'left' && (
          <span className="text-gray-400 mr-2">{icon}</span>
        )}

        <input
          {...rest}
          type={inputType}
          className={inputClasses}
        />

        {isPwd && (
          <button
            type="button"
            className="ml-2 text-gray-400 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {icon && iconPosition === 'right' && !isPwd && (
          <span className="text-gray-400 ml-2">{icon}</span>
        )}
      </div>
    </div>
  );
};
