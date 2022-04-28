
import { Request, Response } from 'express'
const halson = require('halson')

// const handleResponse = (res: Request, data: Response) => res.status(200).send(data);
interface ResponseHandle {
    data: any;
    meta?: any;
}

module.exports = function handleResponse (req: Request, res: Response, data: any): void {
  // if (!data) {
  //     next();

  // }
  const meta = {
    requestDateTime: new Date()
  }

  const respt: ResponseHandle = { data, meta }

  const resource = halson(respt).addLink('self', '/users/')

  res.json(resource)

  // if (res.statusCode !== 200) {

  // } else {

  // }
  // if (req.user) {
  //     next();
  // } else {
  //     // return unauthorized
  //     res.send(401, "Unauthorized");
}
