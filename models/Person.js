import mongoose from 'mongoose';
const { Schema } = mongoose;

// That can be done either by adding it to schema options:
const personSchema = new Schema(
    {
        name: {
            first: String,
            last: String,
        },
    },
    {
        virtuals: {
            fullName: {
                get() {
                    return this.name.first + ' ' + this.name.last;
                },
            },
        },
    }
);

// Or by using the virtual method as following:
personSchema.virtual('fullName').get(function () {
    return this.name.first + ' ' + this.name.last;
});

// compile our model
const Person = mongoose.model('Person', personSchema);

// create a document
const axl = new Person({
    name: { first: 'Axl', last: 'Rose' },
});

module.exports = Person;
