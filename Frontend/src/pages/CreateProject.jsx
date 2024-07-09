import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DashboardNavWrapper from "../components/DashboardNavWrapper";
import { useNavigate } from "react-router-dom";
import SelectInp from "../components/SelectInp";

function CreateProject() {
  const [inputField, setInputField] = React.useState({
    theme: "",
    Reason: "",
    Type: "",
    Division: "",
    start_date: "",
    Category: "",
    Priority: "",
    Department: "",
    Location: "",
  });

  const [error, setError] = useState(false);
  const [end_date, set_Date] = useState(null);
  const [fielderr, setfieldErr] = useState(false);

  // navigate
  const navigate = useNavigate();

  const isDataValidated = (form_data) => {
    if (form_data.theme.length == 0) {
      setError(true);
      return false;
    }
    if (
      form_data.Reason == 0 &&
      form_data.Type == 0 &&
      form_data.Division == 0 &&
      form_data.Category == 0 &&
      form_data.Priority == 0 &&
      form_data.Department == 0 &&
      form_data.Location == 0
    ) {
      setfieldErr(true);
      return false;
    }

    return true;
  };

  const ProjectHandler = (event) => {
    event.preventDefault();
    if (inputField.theme.length == 0) {
      setError(true);
    } else {
      if (
        inputField.Reason == 0 &&
        inputField.Type == 0 &&
        inputField.Division == 0 &&
        inputField.Category == 0 &&
        inputField.Priority == 0 &&
        inputField.Department == 0 &&
        inputField.Location == 0
      ) {
        setfieldErr(true);
      } else {
        fetch(`http://localhost:7000/api/create_project`, {
          method: "POST",
          body: JSON.stringify({
            project_theme: inputField.theme,
            reason: inputField.Reason,
            type: inputField.Type,
            division: inputField.Division,
            category: inputField.Category,
            priority: inputField.Priority,
            department: inputField.Department,
            location: inputField.Location,
            status: "Registred",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
  
            if (data.status == 200) {
              localStorage.setItem("token", data.token);
              navigate("/project_list");
            }
          })
          .catch((e) => setError(true));
      }
    }
  };

  const handleChange = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  return (
    <DashboardNavWrapper>
      <div className="flex absolute top-28 px-5 ">
        <div className="white-box p-12">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="fullWidth"
              multiline
              placeholder="Enter Project Theme"
              rows={2}
              className="proj-theme"
              name="theme"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              className="proj-save-btn"
              onClick={ProjectHandler}
            >
              Save Project
            </Button>
          </Box>
          <p className=" text-red-500">
            {error && "Project Theme is required"}
          </p>

          <div
            style={{ paddingRight: "9%" }}
            className=" lg:columns-3  md:columns-2 sm:columns-1 pt-12 w-full "
          >
            <SelectInp
              setInputField={setInputField}
              inputField={inputField}
              label="Reason"
              placeholder="For Business"
              item={[
                { text: "For Business" },
                { text: "For Peronal" },
                { text: "For Dealership" },
                { text: "For Transport" },
              ]}
            />

            <SelectInp
              setInputField={setInputField}
              inputField={inputField}
              label="Category"
              placeholder="Quality A"
              item={[
                { text: "Quality A" },
                { text: "Quality B" },
                { text: "Quality C" },
              ]}
            />
            <Box className="pt-2">
              <p>Start Date as per Plan</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="start_date"
                  // value={inputFieldstart_date}
                  onChange={handleChange}
                />
              </LocalizationProvider>
            </Box>
            <SelectInp
              setInputField={setInputField}
              inputField={inputField}
              label="Type"
              placeholder="Internal"
              item={[
                { text: "Internal" },
                { text: "External" },
                { text: "Both" },
              ]}
            />

            <SelectInp
              setInputField={setInputField}
              inputField={inputField}
              label="Priority"
              placeholder="Medium"
              item={[{ text: "High" }, { text: "Medium" }, { text: "Low" }]}
            />
            <Box sx={{ minWidth: 120, pt: 2 }}>
              <p>End Date as per Plan</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={end_date}
                  onChange={(newDate) => set_Date(newDate).toLocaleDateString()}
                />
              </LocalizationProvider>
            </Box>
            <SelectInp
              setInputField={setInputField}
              inputField={inputField}
              label="Division"
              placeholder="Filter"
              item={[
                { text: "Filter1" },
                { text: "Filter2" },
                { text: "Filter3" },
              ]}
            />

            <SelectInp
              setInputField={setInputField}
              inputField={inputField}
              label="Department"
              placeholder="Strategy"
              item={[
                { text: "Strategy" },
                { text: "Hospatality" },
                { text: "E-Commerse" },
              ]}
            />

            <SelectInp
              setInputField={setInputField}
              inputField={inputField}
              label="Location"
              placeholder="Pune"
              item={[{ text: "Pune" }, { text: "Mumbai" }, { text: "Nagpure" }]}
            />
          </div>
          <p className="pt-6 px-48 float-right">
            Status: <b>Registered</b>
          </p>

          <Button
            className="mob-proj-save-btn"
            style={{ borderRadius: "20px" }}
            variant="contained"
            onClick={ProjectHandler}
          >
            Save Project
          </Button>
          <p className="text-red-500">{fielderr && "All Field are required"}</p>
        </div>
      </div>
    </DashboardNavWrapper>
  );
}

export default CreateProject;
