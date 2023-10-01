const DataModels = require("../models/dataModels");

async function getData(req, res) {
    try{
        const data = await DataModels.find();
        res.json(data);
    } catch (error) {
        console.error("Error searching of data:", error);
        res.status(500).json({ error: 'Error searching of data' });
    }
}

const createData = async (req, res) => {
    try{
        const data = new DataModels({
            distance: req.body.distance,
            velocity: req.body.velocity,
            steps: req.body.steps,
            heart_rate: req.body.heart_rate,
            calories: req.body.calories,
        });

        const savedData = await data.save();
        res.json(savedData);
    }catch(error) {
        console.error('Error creating data', error);
        res.status(500).json({ error: 'Error creating data' });
    }
};

const updateData = async (req, res) => {
    const newData = {
        distance: req.body.distance,
        velocity: req.body.velocity,
        steps: req.body.steps,
        heart_rate: req.body.heart_rate,
        calories: req.body.calories,
    };

    try {
        const data = await DataModels.findByIdAndUpdate(req.params.id, newData, {new: true});

        if(!data) {
            return res.status(404).json({ error: 'Data not found'})
        }

        res.json(data);
    } catch (error) {
        console.error('Error editing data', error);
        res.status(500).json({ error: 'Error editin data '});
    }
};

module.exports = {
    getData,
    createData,
    updateData,
}