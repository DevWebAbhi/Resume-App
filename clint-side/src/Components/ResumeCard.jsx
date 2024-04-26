import React from 'react'
import { 
    Box,
    Button,
    useToast,
    Text
  } from '@chakra-ui/react'
import axios from 'axios'
const ResumeCard = ({name,link,id,getData}) => {
    const toast = useToast();
    async function handleDelete(){
        try {
            await axios.delete(`https://resume-app-526c.onrender.com/details/${id}`)
            getData();
            toast({
                title: 'Sucessfull',
                description: "Sucessfully Deleted",
                isClosable: true,
              });
        } catch (error) {
            toast({
                title: 'Error',
                description: "Something went wrong",
                isClosable: true,
              });   
        }
    }

  return (
    <Box display={"flex"} width={"70%"} justifyContent={"space-around"} margin={"0.5rem auto 0.5rem auto"} padding={"0.5rem"} borderRadius={"0.5rem"} border={"1px solid"}>
        <Box>
        <Text>{name}</Text>
        <Text color={"red"}><a href={link}  target="_blank" rel="noopener noreferrer">Resume</a></Text>    
        </Box>
        <Box >
            <Button onClick={handleDelete}>Delete</Button>
        </Box>
    </Box>
  )
}

export default ResumeCard
