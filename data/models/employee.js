const mongoose = require("mongoose");
const {nanoid} = require("nanoid"); // 🔹 untuk membuat id unik pendek

// Definisikan Schema untuk data Karyawan
const EmployeeSchema = new mongoose.Schema(
    {
        id: {type: String, unique: true},
        name: {
            type: String,
            required: [true, "Name Should Be Exist"]
        },
        nik: {
            type: String,
            unique: true
        },
        dateOfBirth: {
            type: String
        },
        placeOfBirth: {
            type: String
        },
        religion: {
            type: String,
            enum: ["Islam", "Christian", "Catholic", "Hindu", "Buddhist", "Confucian"]
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: [true, "Gender Must Be Filled"]
        },

        position: {
            type: String,
            required: [true, "Position Should Exist"],
            trim: true
        },
        department: {
            type: String,
            required: [true, "Department Should Be Filled"],
            trim: true
        },
        status: {
            type: String,
            enum: ["Permanent", "Contract"],
            default: "Contract"
        },
        joiningYear: {
            type: Number,
            required: [true, "Joined Year Should Be Filled"]
        },

        address: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        email: {
            type: String,
            required: [true, "Email Should Be Exist"],
            match: [/.+\@.+\..+/, "Email Doesn't Valid"]
        },

        photoUrl: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

EmployeeSchema.pre("save", function (next) {
    if (!this.id) {
        this.id = `TMJ-${nanoid(6)}`;
    }
    next();
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
