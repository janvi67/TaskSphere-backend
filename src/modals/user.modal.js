import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,required:true
        },
        email:{type:String,requires:true,unique:true},

        password:{type:String,required:true},
        role:{
            type:String,enum:['SUPER_ADMIN','ADMIN','TEAM_LEADER','STAFF','EMPLOYEE'],default:'EMPLYEE'

        },
        isActive:{type:Boolean,default:true},
       
    },
     {timestamps:true}
);
// Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
export default mongoose.model("User", userSchema);