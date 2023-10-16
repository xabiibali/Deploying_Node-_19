import express from "express";
import {json}  from "express";
import owner from './owner.js'
import  BookStore from "./bookstores.js";
import Author from './authors.js'
import Book from './books.js'
const server = express()
server.use(json())

server.use('/api/owner', owner)
server.use('/api/BookStore', BookStore)
server.use('/api/author', Author)
server.use('/api/books', Book)
export default server