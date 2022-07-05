import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Container, Paper, Stack, TextField } from '@mui/material'
import { Context } from '../../index'
import classes from './LoginForm.module.scss'

function LoginForm() {
  const { store } = useContext(Context)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const disabledBtn = !email.length || !password.length

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }
  function handleChangepassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function loginClick() {
    store.login(email, password)
  }
  function registrationClick() {
    store.registration(email, password)
  }

  return (
    <Container className={classes.root}>
      <Paper elevation={4} className={classes.paper}>
        <Stack direction="column" spacing={3}>
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={handleChangepassword}
          />
          <Stack direction="row" className={classes.btn}>
            <Button
              variant="contained"
              onClick={loginClick}
              disabled={disabledBtn}
            >
              Логин
            </Button>
            <Button
              variant="contained"
              onClick={registrationClick}
              disabled={disabledBtn}
            >
              Регистрация
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}

export default observer(LoginForm)
