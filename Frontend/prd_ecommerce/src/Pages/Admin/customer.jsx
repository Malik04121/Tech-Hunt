import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { customerMenu } from "../../Component/Redux/adminreducer/action"
import { Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"


function Customer(){
    const [userData,setUserData]=useState([])
    const dispatch=useDispatch()
    const user=useSelector((store)=>store.menuReducer.data)
    const isLoading=useSelector((store)=>store.menuReducer.isLoading)

    const getUser=async()=>{
        try{
        await dispatch(customerMenu())
        setUserData(user)
            
        }
        catch(err){
            console.log(err)
        }
       }
    
      useEffect(()=>{
          getUser()
      },[])

    return(
        <>
              <Box bg="silver" position="fixed" left="200px"  h="1500px" pl="15px" pr="5px">
            <Text fontSize="xl" as="b" ml="30px" mt="30px">User</Text>
            <TableContainer >
       <Table variant='simple' bg="white" mt="20px" >
        <Thead>
         <Tr>
        <Th>UserId</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Phone</Th>
        <Th>Address</Th>

      </Tr>
    </Thead>
    {isLoading?<Text>...Loading</Text>:
    <Tbody>
        
        {userData?.map((user)=>(
            <Tr>
            <Td>{user._id}</Td>
            <Td>{user.username}</Td>
            <Td >{user.email}</Td>
            <Td >{user.phone}</Td>
            {/* <Td >{user.address[0].fulladdress}</Td> */}
          </Tr>
        ))}
      
     
    </Tbody>
     }
   
  </Table>
</TableContainer>
          </Box>
        </>
    )
}
export {Customer}