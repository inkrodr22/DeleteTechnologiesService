const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB:', err));


const Technology = require('./models/technology');


app.delete('/api/technologies/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Technology.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'Tecnología no encontrada' });
        }
        res.send({ message: 'Tecnología eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la tecnología');
    }
});

app.listen(3008, () => {
    console.log('DeleteTechnologyService funcionando en el puerto 3008');
});
