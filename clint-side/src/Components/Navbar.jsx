import React from 'react'
import { Box,Button } from '@chakra-ui/react'
const Navbar = ({onOpen}) => {

  function handleAddDetail(){
      onOpen();
  }
  return (
    <Box padding="0.5rem" background= "linear-gradient(to top, #30cfd0 0%, #330867 100%)">
        <Button borderRadius="0.5rem" display="block" margin="auto" onClick={handleAddDetail}>Add Details</Button>
    </Box>
  )
}

export default Navbar
