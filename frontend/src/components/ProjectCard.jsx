import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateProjectChatFun } from "../redux/projectReducer/action";

const ProjectCard = ({ project, onAddCollaborator, onAddTask, users }) => {
  const { name, description, colleborators, chats } = project;

  const dispatch = useDispatch();
  const toast = useToast();

  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));

  const collaboratorUsernames = colleborators.map((collaboratorId) => {
    const user = users.find((user) => user._id === collaboratorId);
    return user ? user.userName : collaboratorId;
  });

  const [chatMessages, setChatMessages] = useState(chats);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setChatMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          `${userData.userName} : ${newMessage}`,
        ];
        console.log(updatedMessages);
        const newChat = { chats: updatedMessages };
        dispatch(updateProjectChatFun(newChat, project._id, token, toast));
        return updatedMessages;
      });
      setNewMessage("");
    }
  };

  return (
    <Box borderRadius="20px" overflow="hidden" p={5} mb={4} bg={'#FAF6F0'} w={'90%'} m={'auto'} mt={10} color={'white'}>
      <Flex justifyContent={"space-between"} w={"100%"} m={"auto"} gap={5}>
        <Flex w={"30%"} flexDirection={'column'} justifyContent={'space-between'}>
          <Box>
            <Heading size="lg">{name}</Heading>
            <Text mt={2} color="gray.600">
              {description}
            </Text>
          </Box>
          <Box>
            <Button
              size="sm"
              mt={4}
              mb={5}
              h={'40px'}
              borderRadius={'25px'}
              bg={'#0e2a61e6'}
              colorScheme="blue"
              onClick={() => onAddCollaborator(project)}
            >
              Add Collaborator
            </Button>
          </Box>
        </Flex>

        <Box w={"30%"}>
          <Text fontSize={"xl"} fontWeight={"500"} color={'#2D4356'}>
            Collaborators:
          </Text>

          {collaboratorUsernames.length > 0 &&
            collaboratorUsernames.map((collaborator, index) => (
              <Button display={"block"} mt={2} key={index} borderRadius={'20px'} color={'white'} bg={'#2D4356'}>
                {" "}
                {index + 1}. {collaborator}
              </Button>
            ))}
        </Box>

        <Box w={"40%"} bg={'#2D4356'} p={5} borderRadius={'20px'}>
          <Text fontWeight="bold" mb={2}>
            Chat:
          </Text>
          <Box  p={2} overflow={"scroll"} maxH={"250px"}>
            {chatMessages.length > 0 &&
              chatMessages.map((message, index) => (
                <Text key={index} w={"80%"}>
                  {message}
                </Text>
              ))}
          </Box>
          <Flex mt={2}>
            <Input
              value={newMessage}
              size="md"
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button ml={2} onClick={handleSendMessage}>
              Send
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* <Box mt={4}>
        <Text fontWeight="bold" mb={2}>
          Chat:
        </Text>
        <Box borderWidth="1px" p={2} overflow={"scroll"} maxH={"250px"}>
          {chatMessages.length > 0 &&
            chatMessages.map((message, index) => (
              <Text key={index} w={'20%'}>{message}</Text>
            ))}
        </Box>
        <Flex mt={2}>
          <Input
            value={newMessage}
            size="md"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button ml={2} onClick={handleSendMessage}>
            Send
          </Button>
        </Flex>
      </Box> */}
    </Box>
  );
};

export default ProjectCard;
