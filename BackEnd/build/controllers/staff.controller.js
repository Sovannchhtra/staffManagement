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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStaff = exports.deleteStaff = exports.updateStaff = exports.editStaff = exports.createStaff = exports.getStaff = void 0;
const staff_entity_1 = require("../entity/staff.entity");
const getStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffs = yield staff_entity_1.staff.find();
        if (staffs) {
            return res.status(200).json({
                success: true,
                message: 'get all staff successfully',
                staffs
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error get all staff from api controller',
        });
    }
});
exports.getStaff = getStaff;
const createStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, gender, birthday } = req.body;
        const create = yield staff_entity_1.staff.create(Object.assign(Object.assign({}, staff_entity_1.staff), { fullName: name, gender: gender, birthDay: birthday }));
        const staffSave = yield staff_entity_1.staff.save(create);
        if (staffSave) {
            return res.status(201).json({
                success: false,
                message: 'Create staff from api controller',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error create all staff from api controller',
        });
    }
});
exports.createStaff = createStaff;
const editStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffs = yield staff_entity_1.staff.findOne({ where: { staffID: req.params.id } });
        if (staffs) {
            return res.status(200).json({
                success: true,
                message: 'Update staff successfully',
                staffs
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error edit staff from api controller',
        });
    }
});
exports.editStaff = editStaff;
const updateStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, gender, birthday } = req.body;
        const findStaff = yield staff_entity_1.staff.findOne({ where: { staffID: id } });
        const updateStaff = yield (findStaff === null || findStaff === void 0 ? void 0 : findStaff.save(findStaff.fullName = name, findStaff.gender = gender, findStaff.birthDay = birthday));
        if (updateStaff) {
            return res.status(200).json({
                success: true,
                message: 'Update staff successfully'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error edit all staff from api controller',
        });
    }
});
exports.updateStaff = updateStaff;
const deleteStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const staffs = yield staff_entity_1.staff.findOne({ where: { staffID: id } });
        const remove = yield staff_entity_1.staff.remove(staffs);
        if (remove) {
            return res.status(200).json({
                success: true,
                message: 'Delete staff successfully',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Delete staff from api controller',
        });
    }
});
exports.deleteStaff = deleteStaff;
const searchStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.body;
        let staffs = yield staff_entity_1.staff.find();
        if (search) {
            if (search === 'Male' || search === 'male') {
                const genderNumber = 1;
                if (staffs = yield staff_entity_1.staff.find({ where: { gender: genderNumber } })) {
                    return res.status(200).json({
                        success: true,
                        staffs
                    });
                }
            }
            if (search === 'Female' || search === 'female') {
                const genderNumber = 2;
                if (staffs = yield staff_entity_1.staff.find({ where: { gender: genderNumber } })) {
                    return res.status(200).json({
                        success: true,
                        staffs
                    });
                }
            }
            if (staffs = yield staff_entity_1.staff.find({ where: { staffID: search } })) {
                return res.status(200).json({
                    success: true,
                    staffs
                });
            }
        }
        if (search) {
            staffs = staffs.filter(staff => new Date(staff.birthDay) >= new Date(search));
            return res.status(200).json({
                success: true,
                staffs
            });
        }
        if (search) {
            staffs = staffs.filter(staff => new Date(staff.birthDay) <= new Date(search));
            return res.status(200).json({
                success: true,
                staffs
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Seaech staff from api controller',
        });
    }
});
exports.searchStaff = searchStaff;
