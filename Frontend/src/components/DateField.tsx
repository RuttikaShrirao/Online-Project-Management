import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DateField({ label }) {
  const [start_date, setStart_Date] = useState(null);
  const [end_date, set_Date] = useState(null);

  return (
    <>
      <p>{label}</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={start_date}
          onChange={(newDate) => setStart_Date(newDate)}
        />
      </LocalizationProvider>
    </>
  );
}

export default DateField;
