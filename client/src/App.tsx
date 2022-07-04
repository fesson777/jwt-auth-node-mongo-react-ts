import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '.'
import LoginForm from './components/LoginForm'
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

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return <LoginForm />
  }
  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `Вы авторизованы: ${store.user.email}`
          : 'Вы не авторизованы!'}{' '}
      </h1>
      <div className="once">
        <button onClick={() => store.logout()}>Выйти</button>

        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
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
    </div>
  )
}

export default observer(App)
