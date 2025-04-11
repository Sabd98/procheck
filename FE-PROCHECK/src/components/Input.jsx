function Input({ label, textarea, error, ...props }) {
  const classes = `w-full p-1 border-b-2 rounded-sm border-slate-300 bg-slate-200 text-slate-600 focus:outline-none focus:border-slate-600 ${
    error ? "border-red-500" : ""
  }`;

  return (
    <div className="flex flex-col gap-2 my-4">
      <label className="text-sm font-bold uppercase text-slate-500">
        {label}
        {/* {props.required && <span className="text-red-500 ml-1">*</span>} */}
      </label>

      {textarea ? (
        <textarea className={classes} {...props} />
      ) : (
        <input className={classes} {...props} />
      )}

      {error && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
export default Input;
