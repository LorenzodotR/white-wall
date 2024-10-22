import express from 'express';
import axios from 'axios';


const app = express();
const url = 'https://msging.net/commands';

app.use(express.json());

app.post('/login', async (req, res) => {
    const { acessKey } = req.body;

    if (!acessKey || acessKey.length <= 35) {
        res.status(401).json({ message: 'Credenciais inválidas!' });
        return;
    }

    if (acessKey) {
        res.status(200).json({ message: 'Acesso autorizado!' });
    }
});

app.post('/', async (req, res) => {
    const { acessKey } = req.body;
    //GetAllContacts
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": acessKey
            },
            data: {
                "id": "ww1",
                "to": "postmaster@crm.msging.net",
                "method": "get",
                "uri": "/contacts?$skip=0&$take=3"
            }
        });
    } catch (error) { }
});

app.post('/contato/:id', async (req, res) => {
    const { acessKey, identity, id } = req.body;
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": acessKey
            },
            data: {
                id: `${{id}}`,
                method: 'get',
                uri: `/threads/${{identity}}?refreshExpiredMedia=true`
            }
        });
        res.status(200).send(response.data);
    } catch (error) {
        const err = error as any;
        res.status(500).json({ error: err.message });
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000!');
})