const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = {};
let userModel;

let querySchema = {};
let queryModel;

let connection;

module.exports = {
    connect: () => {
        mongoose.connect("mongodb://localhost:27017/CashewCodingDB", (e) => {
            if(e) { console.log("Error connecting to MongoDB: " + e); }
            else {
                console.log("Connected to MongoDB");
                connection = mongoose.connection;

                userSchema = new Schema({
                    username: String,
                    password: String,
                    email: String,
                    firstName: String,
                    lastName: String,
                });

                querySchema = new Schema({
                    date: Date,
                    email: String,
                    subject: String,
                    message: String,
                });

                userModel = connection.model("users", userSchema);
                queryModel = connection.model("queries", querySchema);
            }
        })
    },
    addQuery: (query, callback) => {
        let newQuery = new queryModel(query);
        newQuery.save((e) => {
            if(e) { callback(e); }
            else { callback(); }
        });
    },
    getAllQueries: callback => {
        queryModel.find({}, (e, queries) => {
            if(e) { callback(e); }
            else { callback(null, queries); }
        });
    },
    deleteQuery: (id, callback) => {
        queryModel.findByIdAndDelete(id, (e, query) => {
            if(e) { callback(e); }
            else { callback(null, query); }
        });
    }
}