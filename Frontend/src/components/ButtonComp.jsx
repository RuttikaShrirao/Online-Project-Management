import React from 'react'
import Button from '@mui/material/Button';

function ButtonComp(props) {
  // function ButtonComp({label,variant,...}) {
  return (
  <Button sx={{marginRight:'.5rem',borderRadius:"20px"}} variant={props.variant} size="small" {...props} >
   {props.label}
  </Button>
  )
}

export default ButtonComp