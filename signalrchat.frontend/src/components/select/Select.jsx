import "./style.scss";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const Select = ({ text, value, options, className, isInvalid, onChange }) => {
  const selectRef = useRef();
  const error = isInvalid ? "error" : "";
  return (
    <div className={`select-container ${className ?? ""}`}>
      <select
        className="select"
        value={value}
        onChange={({ target }) => onChange && onChange(target.value)}
      >
        <option></option>
        {(options ?? []).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <div
        className={value ? "select-with-value" : "select-label-container"}
        onClick={() => selectRef.current.focus()}
      >
        <div className={`select-label ${error}`}>
          {isInvalid ? <FontAwesomeIcon icon={faCircleExclamation} /> : <></>}
          {text ?? ""}
        </div>
      </div>
    </div>
  );
};
export default Select;
