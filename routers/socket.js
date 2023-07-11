// Server-side code (router)
import express from "express";
import { handleRollDice } from "../controllers/socketGame.js";

const router = express.Router();

const rollDiceRouter = (io) => {
  const chatNamespace = io.of("/roll-dice");
  chatNamespace.on("connection", (socket) => {
    handleRollDice(socket, chatNamespace, "/roll-dice", io);
  });
};

const socketRouter = (io) => {
  rollDiceRouter(io);
  return router;
};

export default socketRouter;
