import express from "express";
const app = express();

//para acessar as propriedades do express, é necessário executar o comando yarn add @types/express -D

app.get("/test", (req, res) => {
  return res.send("Olá NLW");
});

app.post("/test-post", (req, res) => {
  return res.send("Olá NLW - método POST");
});

app.listen(3000, () => console.log("Server is running"));
