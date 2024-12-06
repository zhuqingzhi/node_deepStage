const express = require('express')
const router = express.Router()
const {socketList}=require('./index')
router.get('/userList', (req, res, next) => {
    const userList = Object.keys(socketList)
    res.json({
        code: 0,
        data: userList.map((item,index) => {
            return {
                id: index,
                username: item,
            }
        })
    })
    next()
})
module.exports = {
    router
}