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
// get all staffs
const getStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffs = yield staff_entity_1.staff.find();
        if (staffs) {
            return res.status(200).json({ success: true, staffs });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
});
exports.getStaff = getStaff;
// create staff
const createStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, gender, birthday } = req.body;
        const create = yield staff_entity_1.staff.create(Object.assign(Object.assign({}, staff_entity_1.staff), { fullName: name, gender: gender, birthDay: birthday }));
        const staffSave = yield staff_entity_1.staff.save(create);
        if (staffSave) {
            return res.status(201).json({ success: false });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
});
exports.createStaff = createStaff;
// edit staff
const editStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffs = yield staff_entity_1.staff.findOne({ where: { staffID: req.params.id } });
        if (staffs) {
            return res.status(200).json({ success: true, staffs });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
});
exports.editStaff = editStaff;
// edit staff submit
const updateStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, gender, birthday } = req.body;
        const findStaff = yield staff_entity_1.staff.findOne({ where: { staffID: id } });
        const updateStaff = yield (findStaff === null || findStaff === void 0 ? void 0 : findStaff.save(findStaff.fullName = name, findStaff.gender = gender, findStaff.birthDay = birthday));
        if (updateStaff) {
            return res.status(200).json({ success: true });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
});
exports.updateStaff = updateStaff;
// delete staff
const deleteStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const staffs = yield staff_entity_1.staff.findOne({ where: { staffID: id } });
        const remove = yield staff_entity_1.staff.remove(staffs);
        if (remove) {
            return res.status(200).json({ success: true });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
    }
});
exports.deleteStaff = deleteStaff;
// search staff
const searchStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffId, gender, fromBirthday, toBirthday } = req.body;
        let staffs = yield staff_entity_1.staff.find();
        if (staffId)
            staffs = staffs.filter(staff => staff.staffID == staffId);
        if (gender)
            staffs = staffs.filter(staff => staff.gender == gender);
        if (fromBirthday)
            staffs = staffs.filter(staff => new Date(staff.birthDay) >= new Date(fromBirthday));
        if (toBirthday)
            staffs = staffs.filter(staff => new Date(staff.birthDay) <= new Date(toBirthday));
        return res.status(200).json({ staffs });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
        });
    }
});
exports.searchStaff = searchStaff;
