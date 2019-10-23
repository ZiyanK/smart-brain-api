const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '3075378386d2476e915ee704ad7d8686'  //Enter api key here
   }); 

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.GENERAL_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}