import React from 'react'
import styles from './header.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'



function Header() {
  return (
    <div className={styles.bcontainer}>

      <div className={styles.first}>
      <img src={logo} alt='logo'></img>
      <p>email: manishbailwal02@gmail.com</p>
      </div>
      

   <div className={styles.container}>

    <div> <Link to="/">Problems</Link></div>
    <div> <Link to="/uploadproblem">UploadProblem</Link></div>
    
    <div><Link to="/playground">Playground</Link></div>
   </div>

   </div>
  )
}

export default Header