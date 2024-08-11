import { forwardRef, useId } from "react";

interface myProps {
    placeholder: string;
    label?: string;
    classnameforInput?: string;
    classnameforLabel?: string;
}

const Input = forwardRef<HTMLInputElement, myProps>(
    (
        { placeholder, label, classnameforInput, classnameforLabel, ...props },
        ref
    ) => {
        const id = useId();
        return (
            <div className="flex flex-col my-3">
                {label && (
                    <label
                        className={` font-sans text-black mb-1.5 ${classnameforLabel}`}
                        htmlFor={id}
                    >
                        {label}
                    </label>
                )}
                <input
                    type="text"
                    className={` font-sans rounded-lg ${classnameforInput}`}
                    placeholder={placeholder}
                    ref={ref}
                    id={id}
                    {...props}
                />
            </div>
        );
    }
);

export default Input;
