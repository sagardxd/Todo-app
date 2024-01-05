const express = require('express');
const cors = require('cors');
const { createTodo, updateTodo } = require('./types');
const { TODO } = require('./modules/todoDB');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Set the origin to your frontend URL
    credentials: true // If you need to send cookies or authentication headers
}));

app.get("/", (req, res) => {
    res.send("hoo")
})

app.post("/todo", async (req, res) => {
    const createPayLoad = req.body;
    const parsePayLoad = createTodo.safeParse(createPayLoad);

    if (!parsePayLoad.success) {
        res.status(411).json({
            msg: 'You sent the wrong inputs'
        })
        return;
    }

    //put in mongoDB
    await TODO.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed: false
    })
    res.json({ msg: "Todo created" })
})

app.get("/todos", async (req, res) => {
    const allTodos = await TODO.find({});

    res.json({ allTodos });
})

app.put("/completed", async (req, res) => {
    const updatePayLoad = req.body;
    const parsePayLoad = updateTodo.safeParse(updatePayLoad);

    if (!parsePayLoad.success) {
        res.status(411).json({
            msg: 'You sent the wrong inputs'
        })
        return;
    }

    await TODO.updateOne({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "Todo marked as completed"
    })
})

app.delete("/todo", async (req, res) => {
    await TODO.deleteOne({
        _id: req.body.id
    })

    res.json({
        msg: "Todo deleted"
    })
})

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
