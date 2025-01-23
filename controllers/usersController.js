const User = require("../model/userModel")
const bcrypt = require("bcrypt") 

module.exports.Register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({ username });

        if(usernameCheck){
            return res.json({ msg: "Username already used", status: false });
        }

        const emailCheck = await User.findOne({ email });

        if(emailCheck){
            return res.json({ msg: "Email already used", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            email, password: hashedPassword, username
        });

        user = user.toObject();
        delete user.password;

        return res.status(200).json({
            user, status: true
        })
    } catch (err){
        console.error(err.stack);
        next(err);
    }
}


module.exports.Login = async (req, res, next) => {
    try{
        const {email, password} = req.body;
    
        let user = await User.findOne({ email: email.toLowerCase() }).lean();

        if(!user){
            return res.json({ msg: "Email does not exist", status: false });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if(!passwordCheck){
            return res.json({
                msg: "Password incorrect", status: false
            })
        }
        delete user.password;

        return res.status(200).json({
            user, status: true
        });

    } catch (err){
        console.error(err.stack);
        next(err);
    }
}

module.exports.SetAvatar = async (req, res, next) => {
    try{
        const {image} = req.body;
        const { id } = req.params;
    
        let user = await User.findByIdAndUpdate(id, {
            isAvatarImageSet: true,
            avatarImage: image,
        }, {
            new: true
        });

        return res.status(200).json({
            isAvatarImageSet: user.isAvatarImageSet,
            avatarImage: user.avatarImage
        });

    } catch (err){
        console.error(err.stack);
        next(err);
    }
}

module.exports.AllUsers = async (req, res, next) => {
    try{
        const { id } = req.params;
    
        let users = await User.find({ _id: { $ne: id } }).select([
            "email", "username", "avatarImage", "_id"
        ]);

        return res.status(200).json({
            users
        });

    } catch (err){
        console.error(err.stack);
        next(err);
    }
}