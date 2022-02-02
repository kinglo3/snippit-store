const router = require("express").Router();
const Snippit = require("../models/snippitModel");

router.get("/", async (req, res) => {
    try {
        const snippits = await Snippit.find();
        res.json(snippits);
    } catch (err) {
        
    }
});

router.post("/", async (req, res) => {
    try {
    const { title, description, code} = req.body;

    //validation

    if (!description && !code) {
        return res.status(400).json({ errorMessage: "Please enter a description or code." });
    }

    const newSnippit = new Snippit({
        title, description, code
    });

    const savedSnippit = await newSnippit.save();

    res.json(savedSnippit);
    } catch(err) {
        res.status(500).send();
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {title, description, code} = req.body;
        const snippitId = req.params.id;

        //validate

        if (!description && !code) {
            return res.status(400).json({ errorMessage: "Please enter a description or code." });
        }

        if (!snippitId)
            return res.status(400).json({ errorMessage: "No snippit ID given." });

        const existingSnippit = await Snippit.findById(snippitId);
        if (!existingSnippit)
            return res.status(400).json({ errorMessage: "No snippit with this ID was found." });

        existingSnippit.title = title;
        existingSnippit.description = description;
        existingSnippit.code = code;

        const savedSnippit = await existingSnippit.save();

        res.json(savedSnippit);

    } catch (err) {
        res.status(500).send();
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const snippitId = req.params.id;
        if (!snippitId)
            return res.status(400).json({ errorMessage: "No snippit ID given." });

        const existingSnippit = await Snippit.findById(snippitId);
        if (!existingSnippit)
            return res.status(400).json({ errorMessage: "No snippit with this ID was found." });

        await existingSnippit.delete();
        res.json(existingSnippit);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;