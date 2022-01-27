import TextField from "@mui/material/TextField";

import { IInput } from "../../types";

const TodoInput = ({ itemText, handleChangeText }: IInput) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      className="input"
      type="text"
      value={itemText}
      placeholder="What needs to be done?"
      onChange={handleChangeText}
    />
  );
};

export default TodoInput;
