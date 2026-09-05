import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'

const PORT = 8000

const __dirname = import.meta.dirname
const surfDataPath = path.join(__dirname, 'data', './surfData.json')
const userCommentsPath = path.join(__dirname, 'data', './userComments.json')
     console.log(pathName)

const server = http.createServer(async (req, res) => {
        //-------Added to work on my local network due to different front/backend ports
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

        if (req.method === 'OPTIONS') {
        res.statusCode = 204
        return res.end()
        }


        if (req.url === '/api/comment' && req.method === 'POST') {

                
                try {
                        let body = ''

                        for await (const chunk of req) {
                                body += chunk.toString()
                        }

                        const parsedBody = JSON.parse(body)


                        const userCommentsFile = await fs.readFile(userCommentsPath, 'utf8')
                        const parsedUserCommentsFile = JSON.parse(userCommentsFile)

                        parsedUserCommentsFile.push(parsedBody)

                        await fs.writeFile(userCommentsPath, JSON.stringify(parsedBody, null, 2), 'utf8')

                        return sendResponse(
                                res,
                                200,
                                'application/json',
                                JSON.stringify({message: 'your comment was added successfully'})
                        )


                }
                catch(err) {
                        console.log(err)
                        sendResponse(
                                res,
                                500,
                                'application/json',
                                JSON.stringify({message: 'There was a server error, your comment could not be added'})
                        )
                }


        } else {
                sendResponse(
                        res,
                        404,
                        'text/plain',
                        JSON.stringify({message: 'url not found'})
                )
        }




}) 

server.listen(PORT, () => {console.log(`Connected on port: ${PORT}`)})