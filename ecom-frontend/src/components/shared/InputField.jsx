// standard input field component for forms
const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {/* label for the input field */}
            <label
                htmlFor="id"
                className={`${className ? className : ""
                    } font-semibold text-sm text-slate-800`}>
                {label}
            </label>

            {/* input field */}
            <input
                type={type} // input type
                id={id} // input id
                placeholder={placeholder} // input placeholder
                className={`${className ? className : ""
                    } px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${errors[id]?.message ? "border-red-500" : "border-slate-700"
                    }`}

                // register the input field with react-hook-form
                {...register(id, {
                    required: { value: required, message },
                    minLength: min // if min is provided, set the min length
                        ? { value: min, message: `Minimum ${min} character is required` }
                        : null,
                    pattern:
                        type === "email" // if type is email, set the pattern for email validation
                            ? {
                                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                message: "Invalid email"
                            }
                            : type === "url" // if type is url, set the pattern for url validation
                                ? {
                                    value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                    message: "Please enter a valid url"
                                }
                                : null, 

                })}
            />

            {/* error message for the input field */}
            {errors[id]?.message && (
                <p className="text-sm font-semibold text-red-600 mt-0">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    );
};

export default InputField;