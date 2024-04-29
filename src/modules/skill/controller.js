
const Skill = require('./model')
const constant = require('../../utilities/constant')
const { customResponse, customPagination } = require("../../utilities/customResponse")

module.exports.add =  async (req, res) => {
    try {
        const { name } = req.body;
        const skill = new Skill({ name });
        await skill.save();
        return res.status(constant.HTTP_201_CODE).send(customResponse({
            code: constant.HTTP_201_CODE,
            message: "Skills has been created",
        }))
    } catch (error) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: error.message,
        }))
    }
};

module.exports.fetchAll =  async (req, res) => {
    try {
        const skills = await Skill.find();
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            data:skills
        }))
    } catch (err) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }))
    }
};

module.exports.fetchOne = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: 'Skill not found'
            }))
        }
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            data:skill
        }))
    } catch (err) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }))
    }
};


module.exports.patchOne= async (req, res) => {
    try {
        const { name } = req.body;
        const skill = await Skill.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!skill) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: 'Skill not found'
            }))
        }
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            data:skill
        }))
    } catch (error) {
        return res.status(constant.HTTP_400_CODE).send(customResponse({
            code: constant.HTTP_400_CODE,
            message: error.message
        }))
    }
};

module.exports.deleteOne= async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        return res.status(constant.HTTP_204_CODE).send(customResponse({
            code: constant.HTTP_204_CODE,
            message:'Deleted Successfully '
        }))
    } catch (err) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }))
    }
};
