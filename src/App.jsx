import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import {
   Box, 
   Button, 
   Flex, 
   useDisclosure,
   Table, 
   Tbody, 
   Td, 
   Th, 
   Thead, 
   Tr,
   useBreakpointValue,
  } from "@chakra-ui/react"

import { useState, useEffect } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({ 
    base: true, 
    lg: false 
  });


  useEffect(() => {
    const db_products = localStorage.getItem("cad_Product")
    ? JSON.parse(localStorage.getItem("cad_Product"))
    : [];

    setData(db_products);
  }, [setData]);

  const handleRemove = (description) => {
    const newArray = data.filter((item) => item.description !== description);

    setData(newArray);

    localStorage.setItem("cad_Product", JSON.stringify(newArray));
  };


  return (
    <Flex
    h="100vh"
    align="center"
    justify="center"
    fontSize="20px"
    fontFamily="poppins"
    >
      <Box maxW={800} w={"100%"} h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Novo Produto
        </Button>
        <Box overflow="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Descrição
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody> 
              {data.map(({ name, description}, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100"}}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td> 
                  <Td maxW={isMobile ? 5 : 100}>{description}</Td> 
                  <Td p={0}> 
                    <EditIcon
                    fontSize={20}
                    onClick={() => [
                      setDataEdit({ name, description, index }),
                      onOpen(),
                    ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                    fontSize={20}
                    onClick={() => handleRemove(description)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      { isOpen && (
          <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          />
      )}
    </Flex>
  )
}

export default App
