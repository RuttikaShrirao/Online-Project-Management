import React from 'react'
import Button from '@mui/material/Button';
// import "../App.css";

function ButtonComp(props) {
  return (
  <Button className='card-btn' style={{borderRadius:"18px", marginRight:'.5rem'}} variant={props.variant} size="small" {...props} >
   {props.label}
  </Button>
  )
}

export default ButtonComp