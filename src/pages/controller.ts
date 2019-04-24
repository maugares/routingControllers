import { JsonController, Get, Put, Post, Param, Body, HttpCode, NotFoundError, Authorized } from "routing-controllers";
import Page from "./entity";

@JsonController()
export default class PageController {

  @Get('/pages/:id')
  async getPage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
  ) {
    const page = await Page.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')
    return Page.merge(page, update).save()
  }

  @Get("/pages")
  async allPages() {
    const pages = await Page.find()
    if (!pages) throw new NotFoundError('Cannot find page')
    return ({ pages })
  }

  @Put('/pages/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
  ) {
    const page = await Page.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')
    return Page.merge(page, update).save()
  }

  @Authorized()
  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() page: Page
  ) {
    console.log(`Incoming POST body param:`, page)
    return page.save()
  }
}
