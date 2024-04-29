
const Shift = require("./model");
const { customResponse, customPagination } = require("../../utilities/customResponse");
const constant = require("../../utilities/constant");
const Skill = require("../skill/model");
const User = require("../user/model");
const Availability = require('../availability/model')

module.exports.createShift = async(req, res)=>{
    try {
        let msg 
        const {startTime , endTime, skills} = req.body
        if (!startTime || !endTime || !skills){
            msg = 'startTime, endTime and skills are required'
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code:constant.HTTP_400_CODE,
                message:msg
            }))
        }
        let all_skills = []
        for (const i of skills) {
            const skill = await Skill.findOne({ name: i });
            if (!skill) {
                const msg = 'Skills does not match';
                return res.status(constant.HTTP_400_CODE).send(customResponse({
                    code: constant.HTTP_400_CODE,
                    message: msg
                }));
            }
            all_skills.push(skill._id);
        }
        
        const createShift =  new Shift({
            startTime:startTime,
            endTime:endTime,
            skills:all_skills
        })
        await createShift.save()
        return res.status(constant.HTTP_201_CODE).send(customResponse({
            code: constant.HTTP_201_CODE,
            message: "Availability has been created",
            data:createShift
        }))

    } catch (error) {
        console.log('first')
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: error.message,
        }))
    }

}

module.exports.assignShift = async(req,res)=>{
    try{
        let msg
        const {userId , shiftId } = req.body
        console.log(userId, shiftId)
        const user = await Availability.findOne({userId:userId})
        if (!user){
            msg = 'UserId does not have availabilities'
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                    code:constant.HTTP_400_CODE,
                    message:msg
                }))
        }
        const shift = await Shift.findOne({_id:shiftId})
        if (!shift){
            msg = 'shiftId does not found'
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                    code:constant.HTTP_400_CODE,
                    message:msg
                }))
        }
        const userData = await User.findOne({_id:userId})

        shift.skills.map((i)=>{
            
            if(!(i in userData.skills)){
                msg = 'User does not have required Skills'
                return res.status(constant.HTTP_400_CODE).send(customResponse({
                    code:constant.HTTP_400_CODE,
                    message:msg
                })) 

            }
        })

        const assignedUser = await Shift.findOne({
            $and: [
                { 'user.availability.startTime': { $lte: shift.startTime } },
                { 'user.availability.endTime': { $gte: shift.endTime } }
            ]
        })
        if(!assignedUser){
            msg = 'User is not available'
                return res.status(constant.HTTP_400_CODE).send(customResponse({
                    code:constant.HTTP_400_CODE,
                    message:msg
                })) 
        }
        shift.assignedTo = user._id
        await shift.save()
 
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code:constant.HTTP_200_CODE,
            message:'Shift assigned'
        })) 


    } catch (error) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: error.message,
        }))
    }

}