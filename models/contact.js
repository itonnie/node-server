var mongoose = require("mongoose");

contactSchema = mongoose.Schema({
    name: String,
    email: String,
    number: String,
    holder: String
});

Contact = mongoose.model("Contact", contactSchema, "contacts");

module.exports = Contact;