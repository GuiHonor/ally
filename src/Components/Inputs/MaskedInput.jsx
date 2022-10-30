import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const MaskedInput = ({mask, value, onChange, label, style, type, innerRef, id, required}) => {
  return (
      <InputMask  ref={innerRef} mask={mask} value={value} onChange={onChange} style={style}>
      
        <TextField  required={required} id={id} type={type} variant="outlined" label={label}/>
        
      </InputMask>
  );
}

export default MaskedInput;