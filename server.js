const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mihasposssposs@gmail.com",
    pass: "ogvcvbvyciwjljga"
  }
});

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (index.html, CSS, imágenes)
app.use(express.static(__dirname));

// Endpoint para recibir pedidos
app.post("/pedido", (req, res) => {
  const { nombre, direccion, producto } = req.body;

  const mensaje = `
Nuevo pedido:

Nombre: ${nombre}
Dirección: ${direccion}
Producto: ${producto}
`;

  const mailOptions = {
    from: "mihasposssposs@gmail.com",
    to: "mihasposssposs@gmail.com",
    subject: "Nuevo pedido 🛒",
    text: mensaje
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar email");
    } else {
      res.send("Pedido recibido correctamente");
    }
  });
});

// Servir index.html al abrir la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Puerto asignado por Render o 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
