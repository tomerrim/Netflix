import Content from "../models/contentModel.js"

export const getAllContent = async (req, res) => {
    try {
        const allContent = await Content.find({});
        allContent ? res.send(allContent) : res.sendStatus(404);
    } catch(err){
        console.log("Error: ", err);
    };
}

export const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Content.find({isSeries: false})
        console.log(allMovies.length)
        allMovies ? res.send(allMovies) : res.sendStatus(404);
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getContentById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Content.findById(id);
        movie ? res.send(movie) : res.sendStatus(404);
    } catch (error) {
        console.log("ERROR",error);
    }
}

export const getAllSeries = async (req, res) => {
  try {
    const allSeries = await Content.find({ isSeries: true });
    console.log(allSeries.length)
    res.send(allSeries);
} catch (error) {
    console.log("Error: ", error);
  }
};