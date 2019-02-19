import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Icon} from '../models';
import {IconRepository} from '../repositories';

export class IconController {
  constructor(
    @repository(IconRepository)
    public iconRepository : IconRepository,
  ) {}

  @post('/icons', {
    responses: {
      '200': {
        description: 'Icon model instance',
        content: {'application/json': {schema: {'x-ts-type': Icon}}}, //image/svg+xml
      },
    },
  })
  async create(@requestBody() icon: Icon): Promise<any> {
    const atob = require('atob'),

        xmldom = require('xmldom').DOMParser,

        SVGO = require('svgo'),

        svgo = new SVGO({
            plugins: [{
              cleanupAttrs: true,
            },
                {
                  removeDoctype: true,
          },
                {
                  removeXMLProcInst: true,
          },
                {
                  removeComments: true,
          },
                {
                  removeMetadata: true,
          },
                {
                  removeTitle: true,
          },
                {
                  removeDesc: true,
          },
                {
                  removeUselessDefs: true,
          },
                {
                  removeEditorsNSData: true,
          },
                {
                  removeEmptyAttrs: true,
          },
                {

                  removeHiddenElems: true,
          },
                {

                  removeEmptyText: true,
          },
                {

                  removeEmptyContainers: true,
          },
                {

                  removeViewBox: false,
          },
                {

                  cleanupEnableBackground: true,
          },
                {

                  convertStyleToAttrs: true,
          },
                {

                  convertColors: true,
          },
                {

                  convertPathData: true,
          },
                {

                  convertTransform: true,
          },
                {

                  removeUnknownsAndDefaults: true,
          },
                {

                  removeNonInheritableGroupAttrs: true,
          },
                {

                  removeUselessStrokeAndFill: true,
          },
                {

                  removeUnusedNS: true,
          },
                {

                  cleanupIDs: true,
          },
                {

                  cleanupNumericValues: true,
          },
                {

                  moveElemsAttrsToGroup: true,
          },
                {

                  moveGroupAttrsToElems: true,
          },
                {

                  collapseGroups: true,
          },
                {

                  removeRasterImages: false,
          },
                {

                  mergePaths: true,
          },
                {

                  convertShapeToPath: true,
          },
                {

                  sortAttrs: true,
          },
                {

                  removeDimensions: true,
          },
                {
                  removeAttrs: {attrs: '(stroke|fill)'},
          }]
      });



    if (icon && icon.Data) {
        const iconBase64 = icon.Data;
        var img = atob(iconBase64.replace('data:image/svg+xml;base64,', ''));
        console.log(img);
    }

      let doc = new xmldom().parseFromString(img, "image/svg+xml");

   svgo.optimize(img).then((result: any) => {
       img = result && result.data;
       console.log(img);
   })

    return await {respImgO: img}
  }

  @get('/icons/count', {
    responses: {
      '200': {
        description: 'Icon model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Icon)) where?: Where,
  ): Promise<Count> {
    return await this.iconRepository.count(where);
  }

  @get('/icons', {
    responses: {
      '200': {
        description: 'Array of Icon model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Icon}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Icon)) filter?: Filter,
  ): Promise<Icon[]> {
    return await this.iconRepository.find(filter);
  }

  @patch('/icons', {
    responses: {
      '200': {
        description: 'Icon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() icon: Icon,
    @param.query.object('where', getWhereSchemaFor(Icon)) where?: Where,
  ): Promise<Count> {
    return await this.iconRepository.updateAll(icon, where);
  }

  @get('/icons/{id}', {
    responses: {
      '200': {
        description: 'Icon model instance',
        content: {'application/json': {schema: {'x-ts-type': Icon}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Icon> {
    return await this.iconRepository.findById(id);
  }

  @patch('/icons/{id}', {
    responses: {
      '204': {
        description: 'Icon PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() icon: Icon,
  ): Promise<void> {
    await this.iconRepository.updateById(id, icon);
  }

  @put('/icons/{id}', {
    responses: {
      '204': {
        description: 'Icon PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() icon: Icon,
  ): Promise<void> {
    await this.iconRepository.replaceById(id, icon);
  }

  @del('/icons/{id}', {
    responses: {
      '204': {
        description: 'Icon DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.iconRepository.deleteById(id);
  }
}

// <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 5000 5000"><path stroke-width="7.62" d="M200 4097h2051c-149-217-235-479-235-761 0-706 543-1286 1234-1344V200H200v3897zm2576-1321c-294 295-294 772 0 1067 295 295 773 295 1067 0 295-295 295-772 0-1067-294-295-772-295-1067 0zm-145-145c-375 375-375 982 0 1357 314 314 791 365 1159 153l156 163c121 184 271 482 524 496 192 10 340-138 330-330-14-252-314-408-496-530l-161-154c210-367 159-842-154-1155-375-375-983-375-1358 0zm-722 1212H454V2826h1456c-49 140-78 290-85 445h-524v127h524c6 155 35 305 84 445zm72-1186H454V1640h2542v200c-446 110-816 414-1015 817zM454 1471h2542V454H454v1017zm847-445h848V899h-848v127zm0 1186h848v-127h-848v127z"/></svg>

