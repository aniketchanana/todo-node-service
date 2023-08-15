import express from "express";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import "./data/source/init";
dotEnv.config();
const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

export default server;
