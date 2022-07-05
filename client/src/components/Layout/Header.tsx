import { Link } from 'react-router-dom'
import classes from './Layout.module.scss'
import Logo from '../../assests/bbb.svg'
import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useContext } from 'react'
import { Context } from '../..'

export default function Header() {
  const { store } = useContext(Context)
  function handleLogout() {
    store.logout()
  }
  return (
    <div className={classes.header_root}>
      <div className={classes.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <h3>
        {store.isAuth
          ? `Вы авторизованы: ${store.user.email}`
          : 'Вы не авторизованы!'}
      </h3>

      <div className={classes.auth}>
        {store.user.id ? (
          <section>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </section>
        ) : null}
      </div>
    </div>
  )
}
