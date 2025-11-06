const mongoose = require("mongoose");
const {nanoid} = require("nanoid");

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
            unique: true,
            required: [true, "NIK Karyawan Should Be Filled"]
        },
        nikPersonal: {
            // ✅ NEW FIELD - NIK Personal (KTP)
            type: String,
            required: [true, "NIK Personal (KTP) Should Be Filled"]
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
            // ✅ CHANGED: from Number to String (dd/mm/yyyy format)
            type: String,
            required: [true, "Joining Date Should Be Filled"],
            validate: {
                validator: function (v) {
                    // Validate dd/mm/yyyy format
                    return /^\d{2}\/\d{2}\/\d{4}$/.test(v);
                },
                message: props => `${props.value} is not a valid date format! Use dd/mm/yyyy`
            }
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

// Auto-generate ID before saving
EmployeeSchema.pre("save", function (next) {
    if (!this.id) {
        this.id = `TMJ-${nanoid(6)}`;
    }
    next();
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
