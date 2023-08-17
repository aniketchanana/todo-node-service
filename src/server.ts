import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "reflect-metadata";
dotEnv.config();
import "./data/source/init";
import { domains } from "./constants/whiteListedClientDomains";

const server = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || domains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

server.use(cors(corsOptions));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

export default server;
