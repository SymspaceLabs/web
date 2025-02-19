"use client";

import { useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import { TextField, Grid, Button, Snackbar, Alert, Box } from "@mui/material";
import * as yup from "yup";

// ==============================================================
export default function ProfileEditForm({user}) {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const INITIAL_VALUES = {
    email: user.email || "",
    contact: user.phone || "",
    last_name: user.lastName || "",
    first_name: user.firstName || "",
    // birth_date: new Date(user.dateOfBirth) || new Date()
  };
  const VALIDATION_SCHEMA = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    // email: yup.string().email("invalid email").required("Email is required"),
    // contact: yup.string().required("Contact is required"),
    // birth_date: yup.date().required("Birth date is required")
  });

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is stored securely
        },
        body: JSON.stringify({
          firstName: values.first_name,
          lastName: values.last_name,
          // email: values.email,
          // phone: values.contact,
          // dateOfBirth: values.birth_date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {   
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message);
     
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };
  

  return (
    <>
      <Formik onSubmit={handleFormSubmit} initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA}>
        {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
        }) => <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth name="first_name" label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.first_name} error={!!touched.first_name && !!errors.first_name} helperText={touched.first_name && errors.first_name} />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField fullWidth name="last_name" label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.last_name} error={!!touched.last_name && !!errors.last_name} helperText={touched.last_name && errors.last_name} />
            </Grid>

            {/* <Grid item md={6} xs={12}>
              <TextField fullWidth name="email" type="email" label="Email" onBlur={handleBlur} value={values.email} onChange={handleChange} error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
            </Grid> */}

            {/* <Grid item md={6} xs={12}>
              <TextField fullWidth label="Phone" name="contact" onBlur={handleBlur} value={values.contact} onChange={handleChange} error={!!touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} />
            </Grid> */}

            {/* <Grid item md={6} xs={12}>
              <DatePicker label="Birth Date" value={values.birth_date} onChange={newValue => setFieldValue("birth_date", newValue)} slots={{
            textField: TextField
          }} slotProps={{
            textField: {
              sx: {
                mb: 1
              },
              size: "small",
              fullWidth: true,
              error: Boolean(!!touched.birth_date && !!errors.birth_date),
              helperText: touched.birth_date && errors.birth_date
            }
          }} />
            </Grid> */}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
          </form>
        }
      </Formik>
      <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => setSnackbarOpen(false)}
        >
            <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
            </Alert>
        </Snackbar>
    </>
  );
}