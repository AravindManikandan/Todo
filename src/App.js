// import logo from './logo.svg';
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css';
import './assets/style.scss';
import Header from "../src/component/header/header"
import Search from "../src/component/search/search"
import MediaCard from "../src/component/card/card"
import ButtonComponent from "../src/component/button/button"
import CustomDialog from "../src/component/customDialog/customDialog"
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import axios from "axios";
function App() {
  const mdTheme = createTheme({
    typography: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontSize: 15,
    }
  })
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [todo, setTodo] = React.useState([]);
  const [editData, setEditData] = React.useState({ title: '', description: '', color: '#AC94C7', dateTime: '' });
  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setEditData({ title: '', description: '', color: '#AC94C7', dateTime: '' })
  };

  const handleClose = () => {
    setOpen(false);
    getTodoData();
  };

  const completeTodo = (values) => {
    values.draft = false;
    axios.put(`http://localhost:4401/todos/${values.id}`, values)
      .then((response) => {
        console.log("response", response);
        handleClose();
      })
      .catch(error => {
        // this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
      });
  }
  
  const editForm = (id) => {
    axios.get(`http://localhost:4401/todos/${id}`).then((response) => {
      console.log(response.data);
      setEditData(response.data);
      setOpen(true);
      setIsEdit(true)
    });
  };
  const getTodoData = () => {
    axios.get('http://localhost:4401/todos').then((response) => {
      console.log(response.data);
      setTodo(response.data);
    });
  }
  useEffect(() => {
    getTodoData();
  }, [])
  useEffect(() => {
    setTodo(todo)
  }, [todo])

  return (
    <ThemeProvider theme={mdTheme}>
      <div className="App">
        <Header label='ToDos' />
        {/* alignItems="center" */}
        <Grid container spacing={0} direction="column" justifyContent="center" className='content-grid'>
          <Grid item lg={12} md={12}>
            <Search />
          </Grid>
          {/* <Grid container lg={12} md={12} > */}
          <Grid item lg={12} md={12} style={{ display: 'flex' }} >
            <Grid item lg={6} md={6} style={{ display: 'flex' }}>
              <ButtonComponent type="button" variant="text" label='Add ToDo' startIcon={<AddBoxOutlinedIcon />} onClick={handleClickOpen} />
            </Grid>
            <Grid item lg={6} md={6} style={{ display: 'flex', justifyContent: 'end' }}>
              <ButtonComponent label='Add ToDo' />
            </Grid>
          </Grid>
          {todo.map(ele => (
            <Grid item style={{ marginBottom: '10px' }}>
              <MediaCard data={ele} editForm={editForm} completeTodo={completeTodo} />
            </Grid>
          ))}
        </Grid>
        <CustomDialog open={open} editData={editData} isEdit={isEdit} handleClose={handleClose} />

      </div>
    </ThemeProvider >
  );
}

export default App;
