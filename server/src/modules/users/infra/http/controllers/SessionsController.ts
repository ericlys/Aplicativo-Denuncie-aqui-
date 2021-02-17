import { Request, Response } from "express";
import { container } from 'tsyringe';

import AutenticateUserService from '@modules/users/services/AutenticateUserService';

export default class SessionsController{
  async create(request: Request, response: Response): Promise<Response>{
    try {
      const { email, password } = request.body;
  
      const authenticateUser = container.resolve(AutenticateUserService);
  
      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });
  
      delete user.password;
  
      return response.json({ user, token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}