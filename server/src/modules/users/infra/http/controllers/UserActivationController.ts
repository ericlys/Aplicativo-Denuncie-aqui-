import { Request, Response } from "express";
import ActiveUserService from '@modules/users/services/ActiveUserService';
import { container } from 'tsyringe';

export default class UserActivationController{
  async update(request: Request, response: Response): Promise<Response>{
    try {
      const { token } = request.params;
      const activeUser = container.resolve(ActiveUserService);
      activeUser.execute(token);
      return response.status(200).send('usuario ativado');
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}