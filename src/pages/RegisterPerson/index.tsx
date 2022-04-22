import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type userProps = {

  id: string,
  name: string,
  lastName: string,
  email: string,
  hasAccepted: boolean
}

function RegisterPerson() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [hasAccepted, setHasAccepted] = useState(false);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser: userProps = {
      id: uuidv4(),
      name,
      lastName,
      email,
      hasAccepted
    }

    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const newUserRef = push(usersRef);
    set(newUserRef, newUser);

    setName('');
    setLastName('');
    setEmail('');
    setHasAccepted(false);

  }

  const theme = createTheme();
  const isDisabled = false;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    //name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    //name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    label="Sobrename"
                    type="text"
                    id="lastName"
                    autoComplete="current-lastName"
                  />
                </Grid>
                <Grid item xs={12}>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    //name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox
                      color="primary"
                      checked={hasAccepted}
                      onChange={(e) => setHasAccepted(!hasAccepted)}
                    />}
                    label="Desejo me cadastrar e confirmar presença no evento"
                  //name="hasAccepted"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isDisabled}
                  >
                    Realizar Cadastro
                  </Button>
                </Grid>
              </Grid>

            </Box>
          </Box>

        </Container>
      </ThemeProvider>
    </>
  )
}


export default RegisterPerson;
