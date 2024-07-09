import { Route, Routes } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import Project_List from "./pages/Project_List";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    direction: "rtl",
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element=<Login /> />
          <Route path="/dashboard" element=<Dashboard /> />
          <Route path="/create_project" element=<CreateProject /> />
          <Route path="/project_list" element=<Project_List /> />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
