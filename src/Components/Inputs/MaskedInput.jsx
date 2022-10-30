import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const MaskedInput = ({mask, value, onChange, label, style, type, innerRef, id}) => {
  return (
    <InputMask ref={innerRef} mask={mask} value={value} onChange={onChange} style={style}>
      <TextField id={id} type={type} variant="outlined" label={label}/>
    </InputMask>
  );
}

export default MaskedInput;