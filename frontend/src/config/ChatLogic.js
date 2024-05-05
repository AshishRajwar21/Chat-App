export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
export const getSenderAll = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (message, m, ind, userId) => {
  return (
    ind < message.length - 1 &&
    (message[ind + 1].sender._id !== m.sender._id ||
      message[ind + 1].sender._id === undefined) &&
    message[ind + 1].sender._id !== userId
  );
};

export const isLastMessage = (message, ind, userId) => {
  return (
    ind === message.length - 1 &&
    message[message.length - 1].sender._id !== userId &&
    message[message.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, ind, userId) => {
  // console.log(i === messages.length - 1);

  if (
    ind < messages.length - 1 &&
    messages[ind + 1].sender._id === m.sender._id &&
    messages[ind].sender._id !== userId
  )
    return 33;
  else if (
    (ind < messages.length - 1 &&
      messages[ind + 1].sender._id !== m.sender._id &&
      messages[ind].sender._id !== userId) ||
    (ind === messages.length - 1 && messages[ind].sender._id !== userId)
  )
    return 0;
  else return "auto";
};
export const isSameUser = (messages, m, ind) => {
  return ind > 0 && messages[ind - 1].sender._id === m.sender._id;
};
