import { Container } from '@mui/material'
import { ReactNode } from 'react'
import Header from './Header'
import classes from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={classes.root}>
      <Container>
        <Header />
      </Container>
      <Container className={classes.main_container}>{children}</Container>
    </div>
  )
}
