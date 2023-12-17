const mongoose=require("mongoose")

require("dotenv").config();

//const connection = mongoose.connect(process.env.mongoURL);
const connection = mongoose.connect("mongodb+srv://hrutik0729:hrutik@cluster0.9kopobq.mongodb.net/NEM_111(121)?retryWrites=true&w=majority");
module.exports = { connection };
