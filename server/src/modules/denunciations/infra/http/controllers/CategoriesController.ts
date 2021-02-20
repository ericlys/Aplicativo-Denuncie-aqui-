import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/denunciations/services/CreateCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, icon } = request.body;

    const CreateCategory = container.resolve(CreateCategoryService);

    const category = await CreateCategory.execute({
      title,
      icon,
    });

    return response.json(category);
  }
}
