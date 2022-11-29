import React, { useEffect, useState } from "react";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonComponent from "../button/button";
import {
    Formik, Form, Field, ErrorMessage, useFormikContext
} from 'formik';
import * as Yup from 'yup';
import Header from "../header/header";
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
// import dayjs from 'dayjs';
// import Stack from '@mui/material/Stack';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const CustomDialog = (props) => {
    const { classes } = props;
    const [todoData, setTodoData] = useState({ title: '', description: '', color: '#AC94C7', dateTime: '' })
    const [isEdit, setisEdit] = useState(false)
    const isEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    useEffect(() => {
        setTodoData(props.editData);
    }, [props.editData])
    useEffect(() => {
        setisEdit(props.isEdit);
    }, [props.isEdit])

    const onDelete = (values) => {
        axios.delete(`http://localhost:4401/todos/${values.id}`)
            .then((response) => {
                console.log("response", response)
                props.handleClose();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const onSubmitForm = (values, errors, isDraft) => {
        console.log("isEmpty(errors)", isEmpty(errors))
        if (isEmpty(errors)) {
            values.draft = isDraft;
            if (props.isEdit) {
                axios.put(`http://localhost:4401/todos/${values.id}`, values)
                    .then((response) => {
                        console.log("response", response)
                        props.handleClose();
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            } else {
                axios.post('http://localhost:4401/todos', values)
                    .then((response) => {
                        console.log("response", response);
                        props.handleClose();
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            }

        } else {
            console.log("err", errors)
        }
    }
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>        <Header label="Add/Edit Todo" /></DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={todoData}
                    enableReinitialize={true}
                    // onSubmit={(values) => {
                    // console.log("values 1", values)
                    // onSubmitForm(values);
                    // setSubmitting(true);
                    // axios.post(contactFormEndpoint,
                    //     values,
                    //     {
                    //         headers: {
                    //             'Access-Control-Allow-Origin': '*',
                    //             'Content-Type': 'application/json',
                    //         }
                    //     },
                    // ).then((resp) => {
                    //     setSubmitionCompleted(true);
                    // }
                    // );
                    // }}

                    validationSchema={Yup.object().shape({
                        // email: Yup.string()
                        //     .email()
                        //     .required('Required'),
                        title: Yup.string()
                            .required('Required'),
                        description: Yup.string()
                            .required('Required'),
                    })}
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                            setFieldValue
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={0} direction="column" justifyContent="center" className='formGrid'>
                                    <Grid item >
                                        <TextField
                                            label="Titile"
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.title && touched.title) && errors.title}
                                            margin="normal"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item className="pdtop20">
                                        <TextField
                                            label="Description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.description && touched.description) && errors.description}
                                            margin="normal"
                                            multiline={true}
                                            minRows={2}
                                            maxRows={10}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} style={{ display: 'flex' }} >
                                        <Grid item lg={6} md={6} style={{ display: 'flex' }} className="pdtop20">
                                            <Radio
                                                checked={values.color === "#AC94C7"}
                                                onChange={() => setFieldValue("color", "#AC94C7")}
                                                value="#AC94C7"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': '#AC94C7' }}
                                                style={{ color: '#AC94C7', background: "#AC94C7", marginRight: '5px' }}
                                            />
                                            <Radio
                                                checked={values.color === "#FCFF4B"}
                                                onChange={() => setFieldValue("color", "#FCFF4B")}
                                                value="#FCFF4B"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': '#FCFF4B' }}
                                                style={{ color: '#FCFF4B', background: "#FCFF4B", marginRight: '5px' }}
                                            />
                                            <Radio
                                                checked={values.color === "#FFD3BA"}
                                                onChange={() => setFieldValue("color", "#FFD3BA")}
                                                value="#FFD3BA"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': '#FFD3BA' }}
                                                style={{ color: '#FFD3BA', background: "#FFD3BA", marginRight: '5px' }}
                                            />
                                            <Radio
                                                checked={values.color === "#AFDEDC"}
                                                onChange={() => setFieldValue("color", "#AFDEDC")}
                                                value="#AFDEDC"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': '#AFDEDC' }}
                                                style={{ color: '#AFDEDC', background: "#AFDEDC", marginRight: '5px' }}
                                            />
                                            <Radio
                                                checked={values.color === "#8EF9F3"}
                                                onChange={() => setFieldValue("color", "#8EF9F3")}
                                                value="#8EF9F3"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': '#8EF9F3' }}
                                                style={{ color: '#8EF9F3', background: "#8EF9F3" }}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} style={{ display: 'flex', justifyContent: 'end' }} className="pdtop20">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    name="dateTime"
                                                    label="Date&Time"
                                                    value={values.dateTime}
                                                    onChange={(newValue) => setFieldValue("dateTime", newValue)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <Grid container spacing={0} direction="row" className='btnGrid pdtop20' lg={12} md={12} >
                                        <Grid item lg={6} md={6} style={{ display: 'flex' }}>
                                            <ButtonComponent type="button" isDisable={!(isEdit)} className="deletebtn" variant="contained" label='Delete' startIcon={<DeleteIcon />} onClick={() => { onDelete(values) }} />
                                        </Grid>
                                        <Grid item lg={6} md={6} spacing={2} style={{ display: 'flex', justifyContent: 'end' }} >
                                            <ButtonComponent type="button" className="saveDraftbtn" variant="outlined" label='Save as Draft' onClick={() => { onSubmitForm(values, errors, true) }} />
                                            <ButtonComponent type="button" className="savebtn" variant="contained" label='Save' startIcon={<DeleteIcon />} onClick={() => { onSubmitForm(values, errors, false) }} />
                                        </Grid>
                                    </Grid>
                                </DialogActions>
                            </form>
                        );
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog;