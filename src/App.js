import {
  Container,
  Select,
  MenuItem,
  Slider,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import api from "./api";
import constants from "./constants";
import { generateUrl } from "./utils";
import { TablePaginationActions, CustomSearchBar } from "./components";
function App() {
  const [value, setValue] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2012);
  const [cardata, setCardata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, cardata.length - page * rowsPerPage);
  const getSearchBySelect = (make, model, year) => {
    const data = { make, vehicletype: model, modelyear: year };
    const url = generateUrl(data);
    api
      .get(url)
      .then(function (response) {
        setCardata(response.data.Results);
      })
      .catch(function (error) {
        console.log("api call error response :: ", error);
      });
  };
  const getSearchByClue = (clue) => {
    api
      .get(`/vehicles/getmodelsformake/${clue}?format=json`)
      .then(function (response) {
        setCardata(response.data.Results);
      })
      .catch(function (error) {
        console.log("api call error response :: ", error);
      });
  };
  useEffect(() => {
    if (make === "") return;
    getSearchBySelect(make, model, year);
  }, [make, model, year]);
  const handleMakeChange = (event) => {
    setMake(event.target.value);
    setValue("");  
  };
  const handleModelChange = (event) => {
    setModel(event.target.value);
    setValue("");
  };
  const handleYearChange = (event, newValue) => {
    setYear(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const changeInput = (e) => {
    setValue(e.target.value);
  };
  const handleChange = () => {
    if (value === "") return;
    getSearchByClue(value);
    setMake("");
    setModel("");
  };
  return (
    <Container maxWidth="md" style={{ height: "100vh", paddingTop: 50 }}>
      <CustomSearchBar
        value={value}
        onChange={changeInput}
        onClick={handleChange}
      />
      <Typography
        id="demo-simple-select-placeholder-label-label"
        gutterBottom
        style={{ marginTop: 30 }}
      >
        Make
      </Typography>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        value={make}
        fullWidth
        variant="outlined"
        onChange={handleMakeChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {constants.MAKES.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <Typography
        id="demo-simple-select-placeholder-label-label2"
        gutterBottom
        style={{ marginTop: 30 }}
      >
        Model
      </Typography>
      <Select
        labelId="demo-simple-select-placeholder-label-label2"
        value={model}
        fullWidth
        variant="outlined"
        onChange={handleModelChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {constants.MODELS.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <Typography
        style={{ marginTop: 30 }}
        id="discrete-slider-always"
        gutterBottom
      >
        Year
      </Typography>
      <Slider
        style={{ marginTop: 30 }}
        defaultValue={2021}
        value={year}
        aria-labelledby="discrete-slider-always"
        valueLabelDisplay="on"
        step={1}
        min={1996}
        max={2035}
        onChange={handleYearChange}
      />
      <div>
        {cardata.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell align="right">Make_ID</TableCell>
                  <TableCell align="right">Make_Name</TableCell>
                  <TableCell align="right">Model_ID</TableCell>
                  <TableCell align="right">Model_Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? cardata.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : cardata
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{row.Make_ID}</TableCell>
                    <TableCell align="right">{row.Make_Name}</TableCell>
                    <TableCell align="right">{row.Model_ID}</TableCell>
                    <TableCell align="right">{row.Model_Name}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
              {
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={5}
                      count={cardata.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              }
            </Table>
          </TableContainer>
        ) : (
          <h5>No Results</h5>
        )}
      </div>
    </Container>
  );
}
export default App;
