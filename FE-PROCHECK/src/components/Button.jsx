const Button = ({children, ...props}) => {
  return (
    <button className="px-4 py-2 text-2xl md:text-xl font-bold rounded-md bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-100"
    {...props}>
     {children}
    </button>
  );
};

export default Button;
