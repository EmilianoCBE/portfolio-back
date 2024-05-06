require('dotenv').config();

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Configurar el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // Configurar el contenido del correo electrónico
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "destinatario@example.com",
    subject: `Nuevo mensaje de ${name} (${email})`,
    text: message
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
      res.status(500).send("Error al enviar el correo electrónico");
    } else {
      console.log("Correo electrónico enviado:", info.response);
      res.status(200).send("Correo electrónico enviado correctamente");
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
