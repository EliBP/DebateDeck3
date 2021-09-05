import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, TextField, Button } from "@material-ui/core";
import theme from "./projectTheme";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../contexts/authContext";

//setup validation for formik using yup
const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .required("Enter your first name"),
  lastName: yup.string("Enter your last name").required("Enter your last name"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password")
    .min(8, "Password should be of minimum 8 characters length")
});

//Styling for Material UI components
const useStyles = makeStyles({
  root: {
    background: theme.palette.background.default,
    width: "100%",
    height: "100%",
    position: "absolute",
    padding: theme.spacing()
  },
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 24,
    maxWidth: 400,
    marginRight: "auto",
    marginLeft: "auto",
    background: theme.palette.background.paper
  },
  titleText: {
    color: theme.palette.text.primary,
    textAlign: "center",
    margin: theme.spacing(2)
  },
  textBelowCard: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: theme.spacing(1)
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "center",
    display: "flex"
  },
  textField: {
    margin: theme.spacing(1),
    width: "80%"
  },
  signupButton: {
    textTransform: "none",
    margin: theme.spacing(2),
    width: 150,
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main
  }
});

export default function EvidenceCard() {
  //Firebase Setup
  const { signup } = useAuth();

  //formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //JSON Test
      //alert(JSON.stringify(values, null, 2));

      //Firebase signup function on form submittion
      signup();

      alert(values);
    }
  });

  //setup styling
  const classes = useStyles();

  //Returning the form itself
  return (
    <div className={classes.root}>
      <Card variant="outlined" className={classes.card}>
        <Typography variant="h4" className={classes.titleText}>
          Signup
        </Typography>
        <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
          {/* FIRST NAME */}
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            className={classes.textField}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          {/* LAST NAME */}
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            className={classes.textField}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          {/* EMAIL */}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            className={classes.textField}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* PASSWORD */}
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            className={classes.textField}
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* CONFIRM PASSWORD */}
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            className={classes.textField}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          {/* SUBMIT BUTTON */}
          <Button
            className={classes.signupButton}
            variant="contained"
            type="submit"
          >
            Signup
          </Button>
        </form>
      </Card>
      <Typography className={classes.textBelowCard}>
        Already have an account? Login
      </Typography>
    </div>
  );
}
