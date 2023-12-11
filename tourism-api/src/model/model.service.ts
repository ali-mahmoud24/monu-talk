import { Injectable } from '@nestjs/common';

import * as tf from '@tensorflow/tfjs';
import * as tfn from '@tensorflow/tfjs-backend-cpu';

import { loadGraphModel, loadGraphModelSync } from '@tensorflow/tfjs-converter';

import fs from 'fs';

@Injectable()
export class ModelService {
  async predict() {
    // // const res = await fetch('http://localhost:8000/model');

    // // const jsonModel = res.json();

    // const model = await loadGraphModel('http://localhost:8000/model');

    // console.log(model);

    // const modelPath = '/path/to/your/model.json';
    // const handler = tfn.io.fileSystem(modelPath);

    // const model = await tf.loadLayersModel(handler);

    // const modelPath = './model/model.json';
    // const handler = tfn.io.fileSystem(modelPath);

    const model = await tf.loadLayersModel('http://localhost:8000/model');

    console.log(model);

    // console.log(model.summary());
    // console.log(model.dtype);

    // const model = await tf.loadLayersModel(handler);
  }
}
