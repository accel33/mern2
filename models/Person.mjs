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

personSchema.statics.nombreEnUso = async function (nombre) {
    if (!nombre) throw new Error('Nombre invalido')
    try {
        const usuario = await this.findOne({ nombre })
        if (usuario) return false
        return true
    } catch (error) {
        console.log('error dentro de nombreEnUso', error.message);
        return false
    }
}

personSchema

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

console.log(axl.fullName);
console.log(Person.nombreEnUso('Axl'));

// module.exports = Person;
