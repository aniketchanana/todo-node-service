import express from "express";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import "reflect-metadata";
dotEnv.config();
import "./data/source/init";
const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

export default server;
