import User from "../modals/user.modal.js";

const seedSuperadmin=async()=>{

    const exist= await User.findOne({role:"SUPER_ADMIN"});
    if(exist){
        console.log("Super Admin already exists");
        return;
    }
    await User.create({
        name:"Super Admin",
        email:"superadmin@demo.com",
        password:"superadmin123",
        role:"SUPER_ADMIN"
    });
    console.log("Super Admin create successfully");

}
export default seedSuperadmin;
