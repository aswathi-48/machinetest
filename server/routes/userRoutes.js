import { Router } from "express";
import {  deleteUser, editUser, listUser, login, register } from "../controller/userController.js";

const router = Router()

router.post('/register', register)
router.post('/login',login)
router.post('/list',listUser)
router.patch('/edit',editUser)
router.delete('/delete',deleteUser)

export default router