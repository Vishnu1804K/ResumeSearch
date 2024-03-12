const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    firstName: { 
      type: String, 
      default: "" 
    },
    lastName: { 
      type: String, 
      default: "" 
    },
    email: { 
      type: String, 
      default: "" 
    },
    mobileNumber: { 
      type: String, 
      default: "" 
    },
    portfolio: { 
      type: String, 
      default: "" 
    },
    linkedIn: { 
      type: String, 
      default: "" 
    },
    github: { 
      type: String, 
      default: "" 
    },
    education: { 
      type: Array, 
      default: [] 
    },
    skills: { 
      type: Array, 
      default: [] 
    },
    experience: { 
      type: Array, 
      default: [] 
    },
    projects: { 
      type: Array, 
      default: [] 
    },
    achievements: { 
      type: Array, 
      default: [] 
    },
    address: { 
      type: String, 
      default: "" 
    },
    leetCode: { 
      type: String, 
      default: "" 
    },
    codechef: { 
      type: String, 
      default: "" 
    },
    codeForces: { 
      type: String, 
      default: "" 
    },
    geeksforgeeks: { 
      type: String, 
      default: "" 
    }
  },
  { timestamps: true }
);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
