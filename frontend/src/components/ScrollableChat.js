import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Text, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ message }) => {
  const { user } = ChatState();
  return (
    <>
      <ScrollableFeed>
        {message &&
          message.map((m, ind) => (
            <div
              style={{
                display: "flex",
                justifyContent:
                  user._id === m.sender._id ? "flex-end" : "flex-start",
              }}
              key={m._id}
            >
              {(!isSameSender(message, m, ind, user._id) ||
                isLastMessage(message, ind, user._id)) && (
                <Tooltip
                  placement="bottom-start"
                  hasArrow
                  label={m.sender.name}
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft:
                    user._id === m.sender._id
                      ? "0px"
                      : isSameSenderMargin(message, m, ind, user._id),
                  marginTop: isSameUser(message, m, ind, user._id) ? 3 : 10,
                  borderRadius: `${
                    user._id !== m.sender._id ? "0px" : "20px"
                  } ${user._id === m.sender._id ? "0px" : "20px"} 20px 20px`,
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                <div>{m.content}</div>
                <div display="flex" flex-direction="row-reverse">
                  <Text fontSize="10px">
                    {m.updatedAt.substring(11, 16) +
                      " " +
                      m.updatedAt.substring(8, 10) +
                      "-" +
                      m.updatedAt.substring(5, 7) +
                      "-" +
                      m.updatedAt.substring(0, 4)}
                  </Text>
                </div>
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </>
  );
};

export default ScrollableChat;
