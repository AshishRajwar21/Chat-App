import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getSender, getSenderAll } from "../config/ChatLogic";
import ChatLoading from "./ChatLoading";
import GroupModal from "./miscelleneous/GroupModal";

const MyChats = ({ fetchAgain }) => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error in fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      w={{ base: "100%", md: "30%" }}
      bg="white"
      borderRadius="lg"
      p={3}
      borderWidth="1px"
    >
      <Box
        display="flex"
        flexDir="row"
        w="100%"
        bg="white"
        borderRadius="lg"
        p={2}
        justifyContent="space-between"
      >
        My Chats
        <GroupModal>
          <Button
            display="flex"
            fontSize={{ base: "18px", md: "12px", lg: "18px" }}
            bg="#0c4acc"
            color="white"
            _hover={{ bg: "#e0e2e6", color: "black" }}
            rightIcon={<AddIcon />}
          >
            Create New Group
          </Button>
        </GroupModal>
      </Box>
      <Box
        h="100%"
        bg="white"
        //borderRadius="lg"
        w="100%"
        display="flex"
        alignItems="start"
        p={1}
        //mb={2}
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" width="100%">
            {chats.map((chat) => (
              <>
                <Box>
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#0c4acc" : "#fff"}
                    color={selectedChat === chat ? "white" : "black"}
                    px="8px"
                    py={3}
                    w="100%"
                    //mb={1}
                    //borderRadius="lg"
                    key={chat._id}
                    display="flex"
                    height="60px"
                  >
                    <Avatar
                      mr={2}
                      cursor="pointer"
                      size="sm"
                      name={
                        !chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName
                      }
                      src={
                        !chat.isGroupChat
                          ? getSenderAll(loggedUser, chat.users).pic
                          : ""
                      }
                    />
                    <Box
                      w="100%"
                      display="flex"
                      flexDirection="column"
                      height="60px"
                    >
                      <Text fontSize="18px">
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Text>
                      <Text fontSize="12px">
                        {chat.latestMessage
                          ? getSenderAll(loggedUser, chat.users).name +
                            " : " +
                            chat.latestMessage.content
                          : ""}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="14px">
                        {chat.latestMessage
                          ? chat.latestMessage.updatedAt.substring(11, 16)
                          : ""}
                      </Text>
                      <Text fontSize="9px" width="50px">
                        {chat.latestMessage
                          ? chat.latestMessage.updatedAt.substring(8, 10) +
                            "-" +
                            chat.latestMessage.updatedAt.substring(5, 7) +
                            "-" +
                            chat.latestMessage.updatedAt.substring(0, 4)
                          : ""}
                      </Text>
                    </Box>
                  </Box>
                  <Divider borderColor="#ada1a1" />
                </Box>
              </>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
