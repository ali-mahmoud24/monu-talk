import { Controller, Get, Req, Res } from '@nestjs/common';
import { ModelService } from './model.service';

import * as fs from 'fs';
import { Request, Response } from 'express';

import { readFile } from 'fs/promises';

@Controller('model')
export class ModelController {
  constructor(private modelService: ModelService) {}

  @Get('predict')
  async predict() {
    return this.modelService.predict();
  }

  @Get()
  async getJSONModel() {
    let data = JSON.parse(await readFile('./json2/model.json', 'utf8'));

    return data;
  }
}
