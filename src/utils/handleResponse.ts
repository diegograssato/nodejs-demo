
import next, { Request, Response } from 'express'
import { first, last } from 'lodash'
// const handleResponse = (res: Request, data: Response) => res.status(200).send(data);
const halson = require('halson')

interface ResponseHandle {
    data: any;
    meta?: any;
}

module.exports = function handleResponse (req: Request, res: Response, data: any) {
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
