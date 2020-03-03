var app = require('express')();

app.use('/api', require('./routes/api'));

app.listen(3000);