import { useRef } from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

const InputText = ({
  type,
  value,
  onChange,
  className,
  style,
  label,
  isInvalid,
}) => {
  const inputRef = useRef();
  const error = isInvalid ? "error" : "";
  return (
    <div className={`input-container ${className ?? ""}`}>
      <input
        ref={inputRef}
        style={style}
        className={`input input-${error} ${error}`}
        type={type}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          onChange && onChange(e.target.value);
        }}
      />
      <div
        className={value ? "input-with-value" : "input-box"}
        onClick={() => inputRef.current.focus()}
      >
        <div className={`input-label ${error}`}>
          {isInvalid ? <FontAwesomeIcon icon={faCircleExclamation} /> : <></>}
          {label ?? ""}
        </div>
      </div>
    </div>
  );
};
export default InputText;
