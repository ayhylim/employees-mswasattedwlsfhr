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
            type: String,
            required: [true, "Joining Date Should Be Filled"],
            validate: {
                validator: function (v) {
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
        },

        // 🔥 NEW FIELDS - Banking & Tax Information
        bankName: {
            type: String,
            required: [true, "Bank Name Should Be Filled"],
            trim: true
        },
        accountNumber: {
            type: String,
            required: [true, "Account Number Should Be Filled"],
            trim: true
        },
        npwp: {
            type: String,
            required: [true, "NPWP Should Be Filled"],
            trim: true
        },
        maritalStatus: {
            type: String,
            enum: ["Single", "Married", "Divorced", "Widowed"],
            required: [true, "Marital Status Should Be Filled"]
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
