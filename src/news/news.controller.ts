import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { News, NewsService, NewsChange } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }
  @Get('/:id')
  getNews(@Param('id') id: string): News {
    const idInt = parseInt(id);
    return this.newsService.find(idInt);
  }
  @Post()
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }
  @Delete('/:id')
  remove(@Param('id') id: string): string {
    const idInt = parseInt(id);
    const isRemoved = this.newsService.remove(idInt);
    return isRemoved ? 'новость удалена' : 'указан неверный идентификатор';
  }

  @Put('/:id')
  change(@Param('id') id: string, @Body() news: NewsChange): News {
    const idInt = parseInt(id);
    return this.newsService.change(idInt, news);
  }
  @Get('/list/all')
  listNews(): News[] {
    return this.newsService.listNews();
  }
}
