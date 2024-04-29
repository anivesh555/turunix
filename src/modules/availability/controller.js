
const Availability = require("./model");
const { customResponse, customPagination } = require("../../utilities/customResponse")
const constant = require("../../utilities/constant");


module.exports.add =  async (req, res) => {
    
    try {
        const { userId, startTime, endTime } = req.body;

        const existingAvailability = await Availability.findOne({
            userId: userId,
            $or: [
                { 'availability.startTime': { $lt: endTime }, 'availability.endTime': { $gt: startTime } },
                { 'availability.startTime': { $lte: startTime }, 'availability.endTime': { $gte: endTime } }
            ]
        });

        if (existingAvailability) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: 'Availability conflicts with existing schedule' 
            }))
        }

      
        const newAvailability = new Availability({
            userId: userId,
            availability: [{
                startTime: startTime,
                endTime: endTime
            }]
        });

        const savedAvailability = await newAvailability.save();

        return res.status(constant.HTTP_201_CODE).send(customResponse({
            code: constant.HTTP_201_CODE,
            message: "Availability has been created",
            data:savedAvailability
        }))
    } catch (error) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: error.message,
        }))
    }
}
module.exports.get =  async (req, res) => {
    try {
        const employeeAvailability = await Availability.findOne({ employeeId: req.params.userId });
        if (!employeeAvailability) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: 'Availability not found' 
            }))
        }
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            data:employeeAvailability
        }))
        
        
    } catch (error) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: error.message,
        }))
    }
};