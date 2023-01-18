"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const userModel_1 = __importDefault(require("../model/userModel"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userName, password, firstName, lastName, email } = req.body;
            if (!userName || !password || !firstName || !lastName) {
                return res.status(404).json({ message: "missing fields" });
            }
            const userExist = yield userModel_1.default.findOne({ userName: userName });
            if (userExist)
                return res.status(400).json({ message: "user already exist" });
            const userData = yield userModel_1.default.create(req.body);
            let token;
            if (process.env.JWT_KEY) {
                token = jsonwebtoken_1.default.sign({ username: userData.userName, id: userData._id }, process.env.JWT_KEY, { expiresIn: "1h" });
            }
            res.status(200).json({ message: "successfull", userData, token });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userName, password } = req.body;
            const userData = yield userModel_1.default.findOne({ userName: userName });
            if (userData) {
                if (userData.block)
                    return res.status(403).json("user blocked");
                const userVerified = yield bcrypt_1.default.compare(password, userData.password);
                if (!userVerified)
                    return res.status(404).json({ message: "user verification failed", status: "false" });
                let token;
                if (process.env.JWT_KEY) {
                    token = jsonwebtoken_1.default.sign({ username: userData.userName, id: userData._id }, process.env.JWT_KEY, { expiresIn: "1h" });
                }
                res.status(200).json({ message: "user verified", userData, token });
            }
            else {
                res.status(403).json({ message: "user doesnt exist" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }),
    adminLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userName, password } = req.body;
            const adminData = yield adminModel_1.default.findOne({ userName: userName }, { userName: 1, password: 1 });
            if (adminData) {
                const adminVerified = yield bcrypt_1.default.compare(password, adminData.password);
                if (adminVerified) {
                    let token;
                    if (process.env.JWT_KEY) {
                        token = jsonwebtoken_1.default.sign({ username: adminData.userName, id: adminData._id }, process.env.JWT_KEY, { expiresIn: "1h" });
                    }
                    return res.status(200).json({ adminData, token });
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })
};
