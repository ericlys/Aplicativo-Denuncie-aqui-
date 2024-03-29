import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/denunciations/services/CreateCategoryService';
import ListCategoryService from '@modules/denunciations/services/ListCategoryService';
import DeleteCategoryService from '@modules/denunciations/services/DeleteCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;
    const icon = request.file.filename;

    const CreateCategory = container.resolve(CreateCategoryService);

    const category = await CreateCategory.execute({
      title,
      icon,
    });

    return response.json(classToClass(category));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoryService);
    const categories = await listCategories.execute();
    return response.json(classToClass(categories));
  }

  public delete(request: Request, response: Response): Response {
    const { id } = request.params;
    const deleteCategory = container.resolve(DeleteCategoryService);
    deleteCategory.execute(id);
    return response.json({ status: 'ok' });
  }
}
