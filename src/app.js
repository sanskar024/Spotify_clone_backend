const express= require('express');
const cookieParser= require('cookie-parser');
const authroutes= require('./routes/auth_routes');
const music_routes= require('./routes/music_route');
const app= express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authroutes);
app.use('/api/music',music_routes);

module.exports= app;