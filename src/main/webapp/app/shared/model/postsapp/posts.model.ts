import { CategoryPosts } from 'app/shared/model/enumerations/category-posts.model';

export interface IPosts {
  id?: string;
  title?: string;
  image?: string;
  content?: string;
  category?: CategoryPosts;
}

export class Posts implements IPosts {
  constructor(public id?: string, public title?: string, public image?: string, public content?: string, public category?: CategoryPosts) {}
}
