const Joi=require('joi');
const review = require('./models/review');

//using Joi we are doing here server side validation

//Below is the server side validation for listings schema
//we want to validate listing schema
module.exports.listingSchema =Joi.object({
    listing : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null)
    }).required()
});

//below is the server side validation for review schema
module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});
