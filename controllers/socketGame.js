let clickColor = {
  blue: 0,
  red: 0,
};
let dicesNumber = null;
let previousResult = [];
function generateRandomDices() {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
}

let connectedUsers = {};

const onGetResult = (namespace, diceNumbers) => {
  const sum = diceNumbers.reduce((acc, cur) => acc + cur, 0);

  const getValues = Object.values(connectedUsers).map((user) => {
    let earn = user.earn;
    let totalCoins = user.totalCoins;
    if (sum <= 10) {
      if (user.uoChoose === "U") {
        earn += user.coinChoose;
        totalCoins += user.coinChoose;
        user.isWin = true;
      } else if (user.uoChoose === "O") {
        totalCoins -= user.coinChoose;
        user.isWin = false;
      } else {
        user.isWin = false;
      }
    } else {
      if (user.uoChoose === "O") {
        earn += user.coinChoose;
        totalCoins += user.coinChoose;
        user.isWin = true;
      } else if (user.uoChoose === "U") {
        totalCoins -= user.coinChoose;
        user.isWin = false;
      } else {
        user.isWin = false;
      }
    }
    return { ...user, earn, totalCoins, coinChoose: 0, uoChoose: "" };
  });
  connectedUsers = getValues.reduce(
    (acc, cur) => ({ ...acc, [cur.id]: cur }),
    {}
  );
  getValues.forEach((user) => {
    return namespace.to(user.id).emit(
      "getResult",
      getValues.find((u) => u.id === user.id)
    );
  });
  if (previousResult.length === 10) {
    previousResult = [diceNumbers];
    namespace.emit("previousResult", previousResult);
  } else {
    previousResult = [...previousResult, diceNumbers];
    namespace.emit("previousResult", previousResult);
  }
  clickColor = {
    blue: 0,
    red: 0,
  };
  namespace.emit("clickColor", clickColor);
};

export const handleRollDice = (socket, namespace) => {
  setInterval(() => {
    const seconds = new Date().getSeconds();
    if (seconds % 30 === 0 && dicesNumber === null) {
      dicesNumber = generateRandomDices();
      namespace.emit("getDiceNumbers", dicesNumber);
      onGetResult(namespace, dicesNumber);
    } else if (seconds % 30 !== 0) {
      dicesNumber = null;
    }
  }, 1000);

  socket.on("join", (message) => {
    const roomSize = namespace.sockets.size;
    namespace.emit("roomSize", roomSize);
    namespace.emit("getPreviousResult", previousResult);
    namespace.emit("clickColor", clickColor);
    namespace.emit("previousResult", previousResult);
  });

  socket.on("setUser", (user) => {
    const { id, ...rest } = user;
    connectedUsers[socket.id] = { ...rest, id: socket.id };
    namespace.to(socket.id).emit("setUser", connectedUsers[socket.id]);
    return connectedUsers;
  });

  socket.on("updateUser", (user) => {
    const { id, ...rest } = user;
    const updatedUser = Object.keys(connectedUsers).find(
      (key) => key === socket.id
    );
    if (updatedUser) {
      connectedUsers[updatedUser] = {
        ...user,
        uoChoose: rest.uoChoose || connectedUsers[updatedUser].uoChoose,
        coinChoose: rest.coinChoose || connectedUsers[updatedUser].coinChoose,
      };
    }
    clickColor = {
      red: Object.values(connectedUsers).filter(
        (item) => item.uoChoose === "U" && item.coinChoose > 0
      ).length,
      blue: Object.values(connectedUsers).filter(
        (item) => item.uoChoose === "O" && item.coinChoose > 0
      ).length,
    };
    namespace.emit("clickColor", clickColor);
  });

  socket.on("disconnect", () => {
    const roomSize = namespace.sockets.size;
    namespace.emit("roomSize", roomSize);
    const disconnectedUserId = Object.keys(connectedUsers).find(
      (user) => connectedUsers[user.socketId] === socket.id
    );
    delete connectedUsers[disconnectedUserId];
  });
};
