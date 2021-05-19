import { Request, Response } from 'express';
import { container } from 'tsyringe';
import pdf from 'html-pdf';
import path from 'path';
import ejs from 'ejs';

import ListDenunciationsRangeDayService from '@modules/denunciations/services/ListDenunciationsRangeDayService';

export default class DenunciationsReportController {
  public async index(req: Request, res: Response): Promise<any> {
    const { fromDay, fromMonth, fromYear, toDay, toMonth, toYear } = req.query;

    const ListDenunciationsDay = container.resolve(
      ListDenunciationsRangeDayService,
    );

    const denunciations = await ListDenunciationsDay.execute({
      fromDay: Number(fromDay),
      fromMonth: Number(fromMonth),
      fromYear: Number(fromYear),
      toDay: Number(toDay),
      toMonth: Number(toMonth),
      toYear: Number(toYear),
    });

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'template',
      'index.ejs',
    );

    ejs.renderFile(
      filePath,
      { denunciations, fromDay, fromMonth, fromYear, toDay, toMonth, toYear },
      (err, html) => {
        if (err) {
          return res.status(500).send('Erro in Server');
        }

        const options = {
          height: '11.25in',
          width: '8.5in',
          header: {
            height: '20mm',
          },
          footer: {
            height: '20mm',
          },
        };

        pdf
          .create(html, options)
          .toFile(
            `tmp/pdf/relatorio_${fromDay}_${fromMonth}_${fromYear}_a_${toDay}_${toMonth}_${toYear}.pdf`,
            (eerr, data) => {
              if (eerr) {
                return res.send('erro na geracao do PDF');
              }
              const pdfName = data.filename.split('/')[8];
              return res.json({
                url: `${process.env.APP_API_URL}/pdfs/${pdfName}`,
              });
            },
          );
      },
    );
  }
}
