import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [description, setDescription] = useState(dataEdit.email || "");
    const [price, setPrice] = useState(dataEdit.price || "");


    const handleSave = () => {
        if(!name || !description) return;

        if(nameAlredyExists()) {
            return alert("Nome já existe");
        }

        if(Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, description, price };
        }

        const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { name, description, price}]
        : [...(data ? data : [])];

        localStorage.setItem("cadProduct", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose()
    };

    const nameAlredyExists = () => {
        if(dataEdit.name != name && data?.length) {
            return data.find((item) => item.name === name);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Produtos</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                type="text"	
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Descrição</FormLabel>
                                <Input
                                type="text"	
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Preço</FormLabel>
                                <Input
                                type="Number"	
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComp;
