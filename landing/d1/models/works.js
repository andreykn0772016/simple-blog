var mongoose = require("mongoose");

var worksSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
});

module.exports = mongoose.model("working", worksSchema);
