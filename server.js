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
app.post('/pedido', (req, res) => {
    const pedido = req.body;
    const linea = JSON.stringify(pedido) + '\n';
    fs.appendFile('pedidos.txt', linea, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error guardando pedido' });
        }
        res.json({ mensaje: 'Pedido recibido correctamente' });
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
