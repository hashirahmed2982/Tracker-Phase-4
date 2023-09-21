import axios from "axios";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import TableContainer from '@mui/material/TableContainer';
import { useAuthContext } from "../components/hooks/useAuthContext";
import { toast } from 'react-hot-toast'
import { allTimezones } from '../components/timezones'
import bcrypt from 'bcryptjs'
import {

  Box,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableRow,
  Paper
} from '@mui/material';


function DynamicTable({ TableData, url, catdata, waldata, comdata, column, height }) {
  const { user } = useAuthContext();
  //dynamic object to store edit variable values
  var [obj, setobj] = useState(TableData);
  useEffect(() => {
  }, [TableData]);



  function StringToStars(props) {
  
    // Create a string with the same number of '*' characters as the length of the input string
    const starsString = '*'.repeat(props.length);

    return starsString;
  }

  const initial = TableData;


  const handleCancel = () => {
    setobj(initial);
    setedit(null);
    console.log("cancel", initial);
  }

  //sets edit instance
  const [edit, setedit] = useState(null);

  // get table column names

  // get table heading data
  const ThData = () => {

    return column.map((data, index) => {
      if (index == 0) { return <><TableCell key="INDEX">INDEX</TableCell><TableCell key={data}>{data.toUpperCase()}</TableCell></> } else {
        return <TableCell key={data}>{data.toUpperCase()}</TableCell>
      }
    }
    )
  }

  //handle delete function
  const deleteUser = (_id) => {
    console.log(_id)
    axios
      .delete(
        url + _id, { headers: { 'Authorization': 'Bearer ' + user['token'] }, })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Transaction successfully deleted");
          window.location.reload();

        } else Promise.reject();
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  //handle on change field values
  const handleFormChange = (event, index) => {
    obj[index][event.target.name] = event.target.value;
    setobj({ ...obj })
    console.log("changed", obj)


  }
  async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  }
  function formatDate(date, comp) {

    const year = date.getUTCFullYear().toString().substr(-2);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  //sends post api to url in order to update
  const updateUser = async (_id, data) => {
    const currentDate = new Date();
    console.log(data)
    data['updatedat'] = formatDate(currentDate, data['company']);
    if(data['password']){data['password'] = await hashPassword(data['password']);}
    
    setedit(false);
    axios
      .put(
        url +
        _id,
        data, { headers: { 'Authorization': 'Bearer ' + user['token'] }, }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Transaction successfully updated");
          window.location.reload();

        } else Promise.reject();
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  // get table row datas
  const tdData = () => {
    return TableData.map((data, index) => {
      return (
        <TableRow hover>
          <TableCell key="INDEX"> {index}</TableCell>
          {
            column.map((v) => {
              return <TableCell>
                {edit === index ? (
                  v === 'type' ? ( // Check if the field is 'type'
                    <Select
                      name={v}
                      placeholder={data[v]}
                      value={obj[index][v]} // Use the state variable for edited type
                      onChange={(event) => handleFormChange(event, index)}
                    >
                      <MenuItem value="income">Income</MenuItem>
                      <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                  ) : (
                    v === 'category' ? (
                      <Select
                        name={v}
                        placeholder={data[v]}
                        value={obj[index][v]} // Use the state variable for edited type
                        onChange={(event) => handleFormChange(event, index)}
                      >
                        {catdata.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : v === 'updatedat' ? (<TextField
                      name={v}
                      placeholder={data[v]}
                      value={obj[index][v]}
                      onChange={(event) => handleFormChange(event, index)}
                      multiline
                      variant="standard"
                      disabled
                    />) : v === 'wallet' ? (<Select
                      name={v}
                      placeholder={data[v]}
                      value={obj[index][v]} // Use the state variable for edited type
                      onChange={(event) => handleFormChange(event, index)}
                    >
                      {waldata.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>) : v === 'company' ? (<Select
                      name={v}
                      placeholder={data[v]}
                      value={obj[index][v]} // Use the state variable for edited type
                      onChange={(event) => handleFormChange(event, index)}
                    >
                      {comdata.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>) : v === 'role' ? (<Select
                      name={v}
                      placeholder={data[v]}
                      value={obj[index][v]} // Use the state variable for edited type
                      onChange={(event) => handleFormChange(event, index)}
                    >

                      <MenuItem key={"admin"} value={"admin"}>
                        Admin
                      </MenuItem>
                      <MenuItem key={"user"} value={"user"}>
                        User
                      </MenuItem>

                    </Select>) :
                      v === 'password' ? (
                        <TextField
                          name={v}
                          id="standard-password-input"
                          type="password"
                          autoComplete="current-password"
                          variant="standard"
                          // value={obj[index][v]}
                          onChange={(event) => handleFormChange(event, index)}
                        />
                      ) : v === 'timezone' ? (<Select
                        name={v}
                        placeholder={data[v]}
                        value={obj[index][v]} // Use the state variable for edited type
                        onChange={(event) => handleFormChange(event, index)}
                      >

                        {allTimezones.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name} {option.offset}
                          </MenuItem>
                        ))}

                      </Select>) : (
                        <TextField
                          name={v}
                          placeholder={data[v]}
                          value={obj[index][v]}
                          onChange={(event) => handleFormChange(event, index)}
                          multiline
                          variant="standard"
                        />
                      )
                  )
                ) : 
                  
                    v === 'password' ? (
                      
                      "*****"
                      
                      ) 
                   :
                  data[v]
                }
              </TableCell>
            })
          }
          {
            edit !== index ? <TableCell>
              <IconButton size="small" onClick={() => setedit(index)} >
                <EditIcon sx={{ "&:hover": { color: "green" } }} fontSize="small" />
              </IconButton>
              &nbsp;

              <IconButton aria-label="delete" size="small" onClick={() => deleteUser(data._id)}>
                <DeleteIcon sx={{ "&:hover": { color: "red" } }} fontSize="small" />
              </IconButton>

            </TableCell> : <><TableCell>
              <IconButton size="small" onClick={() => handleCancel()}>
                <CancelIcon sx={{ "&:hover": { color: "red" } }} fontSize="small" />
              </IconButton>
              &nbsp;
              <IconButton size="small" onClick={() => updateUser(data._id, obj[index])}>
                <CheckIcon sx={{ "&:hover": { color: "green" } }} fontSize="small" />
              </IconButton>

            </TableCell>
              <TableCell>

              </TableCell></>
          }


        </TableRow>
      )
    })
  }



  if (height) {
    return (
      <><Paper sx={{ width: '100%', overflow: 'hidden' }}>

        <TableContainer sx={{ maxHeight: height }}>
          {/* <TableContainer> */}

          <Box sx={{ minWidth: 200 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow    >
                  {ThData()}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {tdData()}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Paper></>
    )
  } else {
    return (
      <><Paper sx={{ width: '100%', overflow: 'hidden' }}>

        {/* <TableContainer sx={{ maxHeight: height }}> */}
        <TableContainer>

          <Box sx={{ minWidth: 200 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow    >
                  {ThData()}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {tdData()}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Paper></>
    )

  }
}
export default DynamicTable;