import axios from "axios";
import { HOST } from "../utils/constants";

export const sendAiMessage = async (message, history = []) => {
  const res = await axiosInstance.post("/ai/chat", { message, history });
  return res.data;
};