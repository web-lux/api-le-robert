const express = require("express");
const { getDefinitionGroups, getPronunciation, getUsageExamples, getConjugationGroups } = require("./le-robert");

const app = express();

app.get("/", (req, res) => {
    res.status(404).json({
        code: 404,
        message: "Please look up a valid endpoint."
    });
});

app.get("/definitions/:word", async (req, res) => {
    try {
        const word = req.params.word;
        const definitions = await getDefinitionGroups(word);
        res.status(200).json(definitions);
    } catch (error) {
        res.status(400).json({ 
            code: 400,
            message: error.message
         });
    }
});

app.get("/pronunciation/:word", async (req, res) => {
    try {
        const word = req.params.word;
        const pronunciation = await getPronunciation(word);
        res.status(200).json(pronunciation);
    } catch (error) {
        res.status(400).json({ 
            code: 400,
            message: error.message
         });
    }
});

app.get("/usages/:word", async (req, res) => {
    try {
        const word = req.params.word;
        const usages = await getUsageExamples(word);
        res.status(200).json(usages);
    } catch (error) {
        res.status(400).json({ 
            code: 400,
            message: error.message
         });
    }
});

app.get("/conjugations/:word", async (req, res) => {
    try {
        const word = req.params.word;
        const conjugations = await getConjugationGroups(word);
        res.status(200).json(conjugations);
    } catch (error) {
        res.status(400).json({ 
            code: 400,
            message: error.message
         });
    }
});

app.use((req, res) => {
    res.status(404).json({
        code: 404,
        message: "The server can not find the requested resource."
    });
});

app.listen("3000");