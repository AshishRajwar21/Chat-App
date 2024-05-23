import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getSender } from "../config/ChatLogic";
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
            rightIcon={<AddIcon />}
          >
            Create New Group
          </Button>
        </GroupModal>
      </Box>
      <Box
        h="100%"
        bg="whitesmoke"
        borderRadius="lg"
        w="100%"
        display="flex"
        alignItems="start"
        p={1}
        mb={2}
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" width="100%">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#0c4acc" : "#e0e2e6"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={3}
                w="100%"
                mb={1}
                borderRadius="lg"
                key={chat._id}
              >
                <Text fontSize="16px">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
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
