import { Box, Button, Fade, Paper, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '.'
import Layout from './components/Layout/Layout'
import LoginForm from './components/LoginForm/LoginForm'
import CircularProgress from '@mui/material/CircularProgress'
import { IUser } from './models/response/IUser'
import UserService from './services/UserService'

function App() {
  const { store } = useContext(Context)
  const [users, setUser] = useState<IUser[]>([])
  const [delValue, setDelValue] = useState<string>('')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUser(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  async function deleteUsers() {
    try {
      const response = await UserService.deleteUser(delValue)
      console.log(response)

      // setUser(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  function renderApp() {}

  if (store.isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!store.isAuth) {
    return <LoginForm />
  }
  return (
    <Layout>
      <Box p={1}>
        <Button variant="outlined" onClick={getUsers}>
          Получить пользователей
        </Button>
      </Box>

      <Stack spacing={2} direction="column" p={1}>
        {users.map((user, i) => (
          <Typography variant="h5" gutterBottom component="div" key={user.id}>
            {i + 1}.{user.email}
          </Typography>
        ))}
      </Stack>

      {users.length ? (
        <input
          type="text"
          value={delValue}
          placeholder="удалить из БД"
          onChange={(e) => setDelValue(e.target.value)}
        />
      ) : null}

      {users.length ? (
        <button onClick={() => UserService.deleteUser(delValue.trim())}>
          Удалить
        </button>
      ) : null}
    </Layout>
  )
}

export default observer(App)
