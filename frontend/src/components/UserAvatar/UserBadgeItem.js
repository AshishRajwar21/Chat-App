import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      m={1}
      mb={2}
      bg="purple"
      color="white"
      cursor="pointer"
      borderRadius="lg"
      fontSize="12px"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={2} />
    </Box>
  );
};

export default UserBadgeItem;
