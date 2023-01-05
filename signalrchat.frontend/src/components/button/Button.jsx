import "./style.scss";
const Button = ({ onClick, text, type, className }) => {
  const _type = type ?? "primary";
  return (
    <button className={`button button-${_type} ${className ?? ''}`} onClick={onClick}>
      <div className="button-text">{text}</div>
    </button>
  );
};
export default Button;
