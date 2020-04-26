import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PostsDetailComponent } from 'app/entities/postsapp/posts/posts-detail.component';
import { Posts } from 'app/shared/model/postsapp/posts.model';

describe('Component Tests', () => {
  describe('Posts Management Detail Component', () => {
    let comp: PostsDetailComponent;
    let fixture: ComponentFixture<PostsDetailComponent>;
    const route = ({ data: of({ posts: new Posts('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PostsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PostsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PostsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load posts on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.posts).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
