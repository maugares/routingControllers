import { JsonController, Get, Put, Post, Param, Body, HttpCode } from "routing-controllers";
import Page from "./entity";

@JsonController()
export default class PageController {

  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Page.findOne(id)
  }
  
  @Get("/pages")
  async allPages() {
    const pages = await Page.find()
    return ({ pages })
  }

  @Put('/pages/:id')
  updatePage(
    @Param('id') id: number,
    @Body() body: Partial<Page>
  ): Page {
    console.log(`Incoming PUT body param:`, body)
    return Page[id]
  }

  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() body: Page
  ): Page {
    console.log(`Incoming POST body param:`, body)
    return body
  }
}
