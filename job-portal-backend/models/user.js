const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    
    visa_expiry_date: {
      type: String,
    },

    medicalDisability: {
      type: Boolean,
    },
    comment_medicalDisability: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

  },
  { timestamps: true }
);

userSchema.virtual('fullName')
.get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: async function (password) {
      return new Promise ((resolve) =>{
        console.log("🚀 ~ file: user.js ~ line 189 ~ password", password)
        console.log("🚀 ~ file: user.js ~ line 191 ~ this.hash_passwor", this.hash_password)
        bcrypt.compare(password, this.hash_password, function(err, result) {
          console.log("🚀 ~ file: user.js ~ line 192 ~ bcrypt.compare ~ result", result)
          console.log("🚀 ~ file: user.js ~ line 192 ~ bcrypt.compare ~ err", err)
          // result == true
          if(result){
            resolve(true);
          }else{
            resolve(false);
          }
        });
      })
    }
}

module.exports = mongoose.model('User', userSchema)