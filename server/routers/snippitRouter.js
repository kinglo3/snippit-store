const router = require("express").Router();
const Snippit = require("../models/snippitModel");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    try {
        console.log(req.user);
        const snippits = await Snippit.find({user: req.user});
        res.json(snippits);
    } catch (err) {
        res.status(500).send();
    }
});

router.post("/", auth, async (req, res) => {
    try {
    const { title, description, code} = req.body;

    //validation

    if (!description && !code) {
        return res.status(400).json({ errorMessage: "Please enter a description or code." });
    }

    const newSnippit = new Snippit({
        title, 
        description, 
        code,
        user: req.user,
    });

    const savedSnippit = await newSnippit.save();

    res.json(savedSnippit);
    } catch(err) {
        res.status(500).send();
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const {title, description, code} = req.body;
        const snippitId = req.params.id;

        //validate

        if (!description && !code) {
            return res.status(400).json({ errorMessage: "Please enter a description or code." });
        }

        if (!snippitId)
            return res.status(400).json({ errorMessage: "No snippit ID given." });

        const originalSnippit = await Snippit.findById(snippitId);
        if (!originalSnippit)
            return res.status(400).json({ errorMessage: "No snippit with this ID was found." });

        if (originalSnippit.user.toString() !== req.user)
            return res.status(401).json({ errorMessage: "Unauthorized" });

        originalSnippit.title = title;
        originalSnippit.description = description;
        originalSnippit.code = code;

        const savedSnippit = await originalSnippit.save();

        res.json(savedSnippit);

    } catch (err) {
        res.status(500).send();
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const snippitId = req.params.id;
        if (!snippitId)
            return res.status(400).json({ errorMessage: "No snippit ID given." });

        const existingSnippit = await Snippit.findById(snippitId);
        if (!existingSnippit)
            return res.status(400).json({ errorMessage: "No snippit with this ID was found." });

            if (existingSnippit.user.toString() !== req.user)
            return res.status(401).json({ errorMessage: "Unauthorized" });

            await existingSnippit.delete();

        await existingSnippit.delete();
        res.json(existingSnippit);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;