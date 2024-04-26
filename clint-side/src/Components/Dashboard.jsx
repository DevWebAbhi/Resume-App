import React, { useEffect } from 'react'
import { 
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormLabel,
  FormControl,
  useToast
} from '@chakra-ui/react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_RESUME,ADD_NAME, ADD_PASSWORD, SET_DATA } from '../Redux/actionType'
import axios from "axios"
import ResumeCard from './ResumeCard'
const Dashboard = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const dispatch = useDispatch();
  const selector = useSelector(state=>state);


  function handleFile(e) {
    dispatch({ type: ADD_RESUME, payload: e.target.files[0] });
  }
  
  async function handleSubmit() {
    try {
      if (!selector.name || !selector.resume || !selector.password) {
        toast({
          title: 'Add',
          description: "Please add all details",
          isClosable: true,
        });
        return;
      }
      const formData = new FormData();
      formData.append('PDF', selector.resume);
      formData.append('name', selector.name);
      formData.append('password', selector.password);
      console.log(formData, selector);
      const post = await axios.post(`http://localhost:8080/details/upload`, formData);
      console.log(post);
      getData();
      toast({
        title: 'Sucessfull',
        description: "Posted Sucessfully",
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

  async function getData(){
    console.log(process.env.REACT_APP_HTTP);
    try {
      const data = await axios.get(`http://localhost:8080/details/all`);
      console.log(data)
      dispatch({type:SET_DATA,payload:data.data});
    } catch (error) {
      toast({
        title: 'Error',
        description: "Something went wrong",
        isClosable: true,
      });
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <>
    <Navbar onOpen={onOpen}/>
    <Adddetail dispatch = {dispatch} ADD_PASSWORD={ADD_PASSWORD} ADD_NAME={ADD_NAME} selector={selector} onClose={onClose} onOpen={onOpen} isOpen={isOpen} initialRef={initialRef} finalRef={finalRef} handleFile={handleFile} handleSubmit={handleSubmit}/>
    <Box>
      {
        selector.data?selector.data.map((e,idx )=>(
          <ResumeCard key={e.id} getData={getData} name={e.name} link={e.resume} id={e.id}/>
        )):<></>
      }
    </Box>
    </>
  )
}


function Adddetail({dispatch,ADD_PASSWORD,selector,onOpen,initialRef,isOpen,finalRef,onClose,handleFile,handleSubmit}){
  return (
    <>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder='Name' onChange={(e)=>{dispatch({type:ADD_NAME,payload:e.target.value})}} />
            </FormControl>

            <FormControl>
              <FormLabel>Resume Password</FormLabel>
              <Input ref={initialRef} placeholder='Resume Password' onChange={(e)=>{dispatch({type:ADD_PASSWORD,payload:e.target.value})}} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload Resume</FormLabel>
              <Input type='file' accept='pdf' onChange={handleFile}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={(e)=>{handleSubmit(e); onClose()}}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default Dashboard
