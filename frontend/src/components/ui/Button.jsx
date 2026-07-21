function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;