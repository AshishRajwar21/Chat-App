import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <>
      <Box
        height="60px"
        onClick={handleFunction}
        cursor="pointer"
        bg="whitesmoke"
        borderRadius="lg"
        _hover={{
          background: "green",
          color: "white",
        }}
        w="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={2}
        py={2}
        mb={2}
      >
        <Avatar
          mr={2}
          cursor="pointer"
          size="sm"
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize="xs">
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
