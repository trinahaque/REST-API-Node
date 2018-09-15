// this will make handing request a lot easier
const express = require('express');
const app = express();

app.use((requestAnimationFrame, res, next) => {
    res.status(200).json({
        message: "Email changed again"
    });
});

module.exports = app;