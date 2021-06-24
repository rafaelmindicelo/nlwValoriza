import "reflect-metadata";
import express from "express";
import { router } from "./routes";
import "./database"; //procura o arquivo index

const app = express();

app.use(express.json());

app.use(router); //funciona como middleware

app.listen(3000, () => console.log("Server is running"));
