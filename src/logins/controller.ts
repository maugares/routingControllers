import { JsonController, Post, Body, NotFoundError, BadRequestError } from "routing-controllers";
import { IsString, IsEmail } from 'class-validator'
import User from "../users/entity";
import { sign } from '../jwt'

class AuthenticatePayload {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() { email, password }: AuthenticatePayload
  ) {
    // if user exists
    const user = await User.findOne({ where: { email } })
    if (!user) throw new NotFoundError('Cannot find user')

    // if password is correct
    if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct')

    // send back a jwt token
    const jwt = sign({ id: user.id! })
    return { jwt }

    // else: send some HTTP 400 Bad request error
  }
}