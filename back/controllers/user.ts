import { Request, Response } from "express";
import nodemailer from 'nodemailer'
import User from "../models/User";
import { randomUUID } from 'crypto'
import { createHash } from 'crypto';
import bcrypt from 'bcrypt'

export const emailVerification: (req: Request, res: Response) => Promise<any> = async (req, res) => {
    const { code } = req.body
    
    const hashedCode = createHash('sha1')
    .update(code.toString())
    .digest('hex');
    
    const user = await User.findOne({ code: hashedCode })
    
    if (user?.code === hashedCode) {
        await User.findOneAndUpdate({ token: req.headers.token },{ active: true })

        res.status(200).send('ok')
    } else {
        res.status(200).send('Wrong code')
    }

}

export const registerUser: (req: Request, res: Response) => Promise<any> = async (req, res) => {
    const { email, password } = req.body
    
    const code = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sandia.club8@gmail.com',
          pass: 'zybq uzyj yuec zlmc ',
        },
    });

    await transporter.sendMail({
        from: 'your.email@gmail.com',
        to: email,
        subject: 'Your Verification Code',
        text: `Your code is: ${code}`,
    });
    
    const hashedCode = createHash('sha1')
    .update(code.toString())
    .digest('hex');
    
    const hashedPass = await bcrypt.hash(password, 10);

    await new User({
        email: email,
        password: hashedPass,
        token: randomUUID(),
        code: hashedCode
    }).save()

    res.status(200).send('User created')

}

export const loginUser: (req: Request, res: Response) => Promise<any> = async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({email: email})

    if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        
        if (isValid) {
            if (!user.permissions.sender) {
                await User.findByIdAndUpdate(user._id, {token: randomUUID()})
            }

            res.status(200).send(user.token)
        } else {
            res.status(400).send('Incorrect email or passwor')
        }
    }

}

export const getUsers: (req: Request, res: Response) => Promise<any> = async (req, res) => {
    const users = await User.find()

    res.status(200).send(users)
}

export const updateUser: (req: Request, res: Response) => Promise<any> = async (req, res) => {
    const userId = req.params.userId
    const { permissions } = req.body
    
    await User.findByIdAndUpdate(userId, {permissions: permissions})
}