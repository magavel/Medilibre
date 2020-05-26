import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link, Redirect } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import './renewPassword.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const RenewPassword = ({
  password,
  confirmPassword,
  setRenewPasswordFields,
  errorPassword,
  errorConfirmPassword,
  submitRenewPasswordForm,
  success,
}) => {
  const classes = useStyles();
  const { token } = useParams();

  useEffect(() => {
    setRenewPasswordFields('success', false);
    setRenewPasswordFields('renewToken', token);
  }, []);

  return (
    <div className="renewPassword">
      {success && <Redirect to="/" />}
      <form
        className="renewPassword-content"
        onSubmit={(event) => {
          event.preventDefault();
          if (password.length < 6) {
            setRenewPasswordFields('errorPassword', true);
          }
          else if (confirmPassword.length < 6 || confirmPassword !== password) {
            setRenewPasswordFields('errorConfirmPassword', true);
          }
          else {
            submitRenewPasswordForm();
          }
        }}
      >
        <Link
          to="/"
          className={classes.button}
          style={{
            alignSelf: 'flex-start',
            marginRight: '5rem',
          }}
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            retour
          </Button>
        </Link>
        <DialogTitle>
          Réinitialisation du mot de passe
        </DialogTitle>
        <DialogContentText>
          Réinitialisez votre mot de passe en
          complétant le formulaire ci dessous (min 6 ccaractères):
        </DialogContentText>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            error={errorPassword}
            type="password"
            id="outlined-basic-password"
            label="Nouveau mot de passe"
            variant="outlined"
            value={password}
            onChange={(event) => {
              if (event.target.value.length < 6) {
                setRenewPasswordFields('errorPassword', true);
              }
              else {
                setRenewPasswordFields('errorPassword', false);
              }
              setRenewPasswordFields('password', event.target.value);
            }}
            required
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            error={errorConfirmPassword}
            type="password"
            id="outlined-basic-confirmPassword"
            label="Confirmation"
            variant="outlined"
            value={confirmPassword}
            onChange={(event) => {
              if (event.target.value.length < 6 || event.target.value !== password) {
                setRenewPasswordFields('errorConfirmPassword', true);
              }
              else {
                setRenewPasswordFields('errorConfirmPassword', false);
              }
              setRenewPasswordFields('confirmPassword', event.target.value);
            }}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          style={{
            alignSelf: 'flex-end',
            marginTop: '1rem',
          }}
        >
          Réinitialiser
        </Button>
      </form>
    </div>
  );
};

RenewPassword.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setRenewPasswordFields: PropTypes.func.isRequired,
  errorPassword: PropTypes.bool.isRequired,
  errorConfirmPassword: PropTypes.bool.isRequired,
  submitRenewPasswordForm: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};

export default RenewPassword;
