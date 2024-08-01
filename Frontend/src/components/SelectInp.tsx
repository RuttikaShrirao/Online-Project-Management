import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectInp({ label, placeholder, item, inputField, setInputField }) {
  const handleChange = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ minWidth: 120, paddingTop: "1rem" }}>
      <p className="create-sel-label">{label}</p>
      <FormControl fullWidth>
        <Select
          displayEmpty
          name={label}
          value={inputField[label]}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {item.map((ival, j) => (
            <MenuItem key={j} value={ival.text}>
              {ival.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectInp;
