import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const MaskedInput = ({mask, value, onChange, label, style, type}) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange} style={style}>
      <TextField type={type} variant="outlined" label={label}/>
    </InputMask>
  );
}

export default MaskedInput;