const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  branch: {
    type: String
  },
  phone: {
    type:String
  },
  email:{
    type:String
  },
  bio: {
    type: String
  },
  skills: {
    type: [String]
  },
  githubusername: {
    type: String
  },
  projects: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      techstack: {
        type: [String]
      }
    }
  ],
  social: {
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  codingprofiles: {
    hackerrank: {
      type: String
    },
    codechef: {
      type: String
    },
    codeforces: {
      type: String
    },
    interviewBit: {
      type: String
    }
  }
});

Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
