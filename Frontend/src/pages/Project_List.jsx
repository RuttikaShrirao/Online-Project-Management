import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import ButtonComp from "../components/ButtonComp";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DashboardNavWrapper from "../components/DashboardNavWrapper";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import usePagination from '@mui/material/usePagination';
// import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// table

function Project_List() {
  const [sort, setSort] = React.useState("");
  const [project_list, setProject_list] = React.useState([]);
  const [record, setRecord] = React.useState(false);


  const handleProjectStatusChange = (project_id, pstatus) => {
    fetch(`http://localhost:7000/api/update-project-status/${project_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: pstatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updated_proj_lst = project_list.map((el) =>
          el._id === project_id ? { ...el, status: pstatus } : el
        );
        console.log(updated_proj_lst)
        setProject_list(updated_proj_lst);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:7000/api/project_list`)
      .then((res) => res.json())
      .then((data) => {
        setProject_list(data.data);
        // setRecord(data.data)
      });
  }, [record]);

  const handleChange = (event) => {
    setSort(event.target.value);
    setProject_list(project_list.filter(f =>f.priority==(event.target.value)))
  };

  const filterHandler =(event)=>{
    if((event.target.value).length==0){
      setRecord(project_list)
            }
            else{
              setProject_list(project_list.filter(f => f.project_theme.toLowerCase().includes(event.target.value)) )
            }
  }
  return (
    <DashboardNavWrapper>
      <div className="list-table flex justify-center absolute top-28 px-7 ">
        <div className="white-box p-8">
          <div className="flex justify-between">
            <Search onChange={filterHandler}
              style={{ borderBottom: "1px solid black", display: "flex" }}
            >
       
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <div className="flex  items-center">
              <p className="px-5">Sort By</p>
              <Box>
                <Select
                  displayEmpty
                  value={sort}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Priority</em>
                  </MenuItem>
                  <MenuItem value={'High'}>High</MenuItem>
                  <MenuItem value={'Medium'} >Medium</MenuItem>
                  <MenuItem value={'Low'} >Low</MenuItem>
                </Select>
              </Box>
            </div>
          </div>
          <Box sx={{ paddingTop: 2 }}>
            <Table
              sx={{ minWidth: 650, paddingTop: 30 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell><b>project Name</b></TableCell>
                  <TableCell align="left"><b>Reason</b></TableCell>
                  <TableCell align="left"><b>Type</b></TableCell>
                  <TableCell align="left"><b>Division</b></TableCell>
                  <TableCell align="left"><b>Category</b></TableCell>
                  <TableCell align="left"><b>priority</b></TableCell>
                  <TableCell align="left"><b>Dept</b></TableCell>
                  <TableCell align="left"><b>Location</b></TableCell>
                  <TableCell align="left"><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {project_list.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <b> {row.project_theme}</b>
                      <p>Jun-21, 2020 to Jan-01, 2021</p>
                    </TableCell>
                    <TableCell align="left">{row.reason.slice(3)}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.division}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.priority}</TableCell>
                    <TableCell align="left">{row.department}</TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">
                      <b>{row.status}</b>
                    </TableCell>
                    <TableCell className="flex">
                      {/* <ButtonComp label="Register" variant= {!!row.status && (row.status.toLowerCase() == "register") ? "contained": "outlined" }/>
          <ButtonComp label="Canceled" variant={!!row.status && (row.status.toLowerCase() == "canceled") ? "contained": "outlined" }/>
          <ButtonComp label="Closed" variant={!!row.status && (row.status.toLowerCase() == "closed") ? "contained": "outlined" }/> */}
                      <div className="flex">
                      <ButtonComp
                        label="Start"
                        variant="contained"
                        onClick={() =>
                          handleProjectStatusChange(row._id, "Running")
                        }
                      />
                      <ButtonComp
                        label="Canceled"
                        variant="outlined"
                        onClick={() =>
                          handleProjectStatusChange(row._id, "Canceled")
                        }
                      />
                      <ButtonComp
                        label="Closed"
                        variant="outlined"
                        onClick={() =>
                          handleProjectStatusChange(row._id, "closed")
                        }
                      />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </Box>
        </div>
      </div>

      <div className="card flex flex-col col-flex justify-center absolute top-32 px-7 ">
        <div className=" p-8">
          <div className="flex justify-between">
            <Search onChange={filterHandler}
              style={{ borderBottom: "1px solid black", display: "flex" }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Box>
                <Select
                  displayEmpty
                  value={sort}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Priority</em>
                  </MenuItem>
                  <MenuItem value={'High'}>High</MenuItem>
                  <MenuItem value={'Medium'} >Medium</MenuItem>
                  <MenuItem value={'Low'} >Low</MenuItem>
                </Select>
              </Box>
          </div>

         

        </div>
        {project_list.map((item) => (
          <Box key={item._id} className="card-list my-3">
            <Box className=" flex flex-col ">
              <span className=" flex mb-3 ">
                <span className=" flex-col">
                  <h1>{item.project_theme}</h1>
                  <p>Jun-21, 2020 to Jan-01, 2021</p>
                </span>
                <h1>{item.status}</h1>
              </span>

              <span className=" flex mr-2.5">
                  <p>Reason:</p>
                  {item.reason.slice(3)}
                </span>
              <div className="flex">
             
                <span className=" flex mr-2.5">
                  <p>Type:</p>
                  {item.type}
                </span>
                <span className=" flex ">
                  {" "}
                  <p>
                    {" "}
                    <li>Category:</li>
                  </p>
                  {item.category}
                </span>
              </div>
              <div className="flex">
                <span className=" flex mr-2.5">
                  <p>Div: </p> {item.division}
                </span>
                <span className=" flex ">
                  {" "}
                  <p>
                    {" "}
                    <li>Dept: </li>
                  </p>{" "}
                  {item.department}
                </span>
              </div>
              <span className=" flex ">
                <p>Location:</p>
                {item.location}
              </span>
              <span className=" flex ">
                <p>Priority:</p>
                {item.priority}
              </span>
            </Box>
            <ButtonComp
              label="Start"
              variant="contained"
              onClick={() => handleProjectStatusChange(item._id, "running")}
            />
            <ButtonComp
              label="Cancle"
              variant="outlined"
              onClick={() => handleProjectStatusChange(item._id, "canceled")}
            />
            <ButtonComp
              label="Close"
              variant="outlined"
              onClick={() => handleProjectStatusChange(item._id, "closed")}
            />
          </Box>
        ))}
      </div>
    </DashboardNavWrapper>
  );
}

export default Project_List;
