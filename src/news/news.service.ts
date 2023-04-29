import { Injectable } from '@nestjs/common';

export interface News {
  id?: number;
  title: string;
  description: string;
  author: string;
  countView: number;
}

export interface NewsChange {
  id?: number;
  title?: string;
  description?: string;
  author?: string;
  countView?: number;
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'First news',
      description: 'an example',
      author: 'ODR',
      countView: 4,
    },
    {
      id: 2,
      title: 'Second news',
      description: 'an example',
      author: 'ODR',
      countView: 3,
    },
  ];

  create(news: News): News {
    const id = getRandomInt(0, 999);
    const finalNews = {
      ...news,
      id: id,
    };
    this.news.push(finalNews);
    return finalNews;
  }

  change(id: number, news: NewsChange): News | undefined {
    const indexEditableNews = this.news.findIndex((news) => news.id === id);
    if (indexEditableNews !== -1) {
      this.news[indexEditableNews] = {
        ...this.news[indexEditableNews],
        ...news,
      };
      return this.news[indexEditableNews];
    } else {
      return undefined;
    }
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news) => news.id === id);
  }

  remove(id: News['id']): boolean {
    const indexRemoveNews = this.news.findIndex((news) => news.id === id);
    if (indexRemoveNews !== -1) {
      this.news.splice(indexRemoveNews, 1);
      return true;
    } else {
      return false;
    }
  }
  listNews(): News[] {
    return this.news;
  }
}
