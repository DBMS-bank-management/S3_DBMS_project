import  React from 'react'
import {message } from 'antd'

export const responseErrorHandler = (err) => {
    console.log(err)
    message.error(err)
}