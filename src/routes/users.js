import bcrypt from "bcryptjs";// Sifre hash kontrolu 
import jwt from "jsonwebtoken";
import Users from "../db/users";
import ApiError from "../error/ApiError";


export default (router)=> {
    router.post("/login", async (req, res)=> {
        const {email, password } = req.body;
        const user = await Users.findOne({email: email});
        if(!user) {
            throw new ApiError("Incorrect password or email", 401, "userOrPasswordIncorrect");
        }
        const passwordConfirmed = await bcrypt.compare(password, user.password);
        if(passwordConfirmed){
            const UserJson = user.toJSON();
            const token = jwt.sign(UserJson, process.env.JWT_SECRET);
            res.json({
                token: `Bearer ${token}`,
                user: UserJson
            })
        }else{
            throw new ApiError("Incorrect password or email", 401, "userOrPasswordIncorrect");
        }
    })
}

