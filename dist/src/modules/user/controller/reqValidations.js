"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignInRequest = exports.validateSignUpRequest = void 0;
const yup_1 = require("yup");
exports.validateSignUpRequest = (0, yup_1.object)({
    userDetails: (0, yup_1.object)({
        name: (0, yup_1.string)().required(),
        emailId: (0, yup_1.string)().required(),
        password: (0, yup_1.string)().required(),
    }).required(),
});
exports.validateSignInRequest = (0, yup_1.object)({
    emailId: (0, yup_1.string)().required(),
    password: (0, yup_1.string)().required(),
});
//# sourceMappingURL=reqValidations.js.map