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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    let url = 'http://localhost:4401/todos';
    if (event.target.checked) {
      url += `?draft=${true}`
    }
    getTodoData(url);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setEditData({ title: '', description: '', color: '#AC94C7', dateTime: '' })
  };

  const handleClose = () => {
    setOpen(false);
    getTodoData('http://localhost:4401/todos');
  };
  const SearchFunction = (searchData) => {
    console.log("test re", searchData)
    let url = 'http://localhost:4401/todos';
    if (searchData) {
      url += `?title_like=${searchData}`
    }
    getTodoData(url);
  };

  const completeTodo = (values) => {
    values.draft = false;
    axios.put(`http://localhost:4401/todos/${values.id}`, values)
      .then((response) => {
        console.log("response", response);
        handleClose();
      })
      .catch(error => {
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
  const getTodoData = (url) => {
    axios.get(url).then((response) => {
      console.log(response.data);
      setTodo(response.data);
    });
  }
  useEffect(() => {
    getTodoData('http://localhost:4401/todos');
  }, [])
  useEffect(() => {
    setTodo(todo)
  }, [todo])

  return (
    <ThemeProvider theme={mdTheme}>
      <div className="App">
        <Header label='ToDos' />
        <Grid container spacing={0} direction="column" justifyContent="center" className='content-grid'>
          <Grid item lg={12} md={12}>
            <Search onSearchClick={SearchFunction} />
          </Grid>
          <Grid item lg={12} md={12} style={{ display: 'flex' }} >
            <Grid item lg={6} md={6} style={{ display: 'flex' }}>
              <ButtonComponent type="button" variant="text" label='Add ToDo' startIcon={<AddBoxOutlinedIcon />} onClick={handleClickOpen} />
            </Grid>
            <Grid item lg={6} md={6} style={{ display: 'flex', justifyContent: 'end' }}>
              <FormControlLabel
              className='showDraft'
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Show draft" />

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
