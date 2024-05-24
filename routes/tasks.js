const express = require('express');
const router = express.Router();
const Task = require ('../models/Task.js')

//create task
router.post('/task', async (req,res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).send(task);
    }catch (error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to create a new task"});
    }
});

//get task
router.get('/task', async (req,res) => {
    try{
        const task = await Task.find();
        res.status(201).send(task);
    }catch (error) {
        console.error(error);
        res.status(500).send({message: error});
    }
});

//get task by id
router.get('/task/:id', async (req,res) => {
    const {id} = req.params
    try{
        const task = await Task.findById(id);
        if (!task) { 
            return res.status(404).send({ message: "Task not found" }); 
        }
        res.status(201).send(task);
    }catch (error) {
        console.error(error);
        res.status(500).send({message: "cannot get task"});
    }
});

//update completed
router.put('/task/:id', async (req,res) => {
    const {id} = req.params;
    const {completed} = req.body;
    try{
        const completedTask = await Task.updateOne({_id:id}, {$set: {completed : completed}});
        if(completedTask.modifiedCount === 0){
            return res.status(404).send({ message: "cannot update task" });
        }
        res.status(200).send({message: "task update successfully", completedTask});
    }catch (error){
        console.error(error);
        res.status(500).send({message})
    }
});

//update task
router.put('/task/:id', async (req,res) => {
    const {id} = req.params;
    const {title} = req.body;
    try{
        const task = await Task.updateOne({_id:id}, {$set: {title}});
        res.status(200).send(task);
    }catch (error){
        console.error(error);
        res.status(500).send({message: "cannot update task"});
    }
});

//delete task
router.delete('/task/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const result = await Task.deleteOne({_id:id});
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(201).send('task deleted successfully');
    }catch (error){
        console.error(error);
        res.status(500).send({message: "cannot delete task"})
    }
});


module.exports = router;