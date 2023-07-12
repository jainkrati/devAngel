const app = require('express')();
const PORT = 8080;

app.listen(PORT, () => console.log('APIs are live'));

app.get('/questions', (req, res) => {
    res.status(200).send({
        id: '0x0e30ef3fe1579d1ab4ace2c240d57f12b54b5dfe2edfd643c1ebcb9c08e1387c1b000000',
        questionId: '8',
        title: 'Need help debugging LivePeer Goerli Integration',
        description: 'The upload errors out.'
    });
});

app.get('/summary', (req, res) => {
    res.status(200).send({
        total: 10,
        one_day: 3,
        two_day: 3,
        more_days: 4
    });
});
