import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPosts, Posts } from 'app/shared/model/postsapp/posts.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'jhi-posts-update',
  templateUrl: './posts-update.component.html'
})
export class PostsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    image: [],
    content: [],
    category: []
  });

  constructor(protected postsService: PostsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ posts }) => {
      this.updateForm(posts);
    });
  }

  updateForm(posts: IPosts): void {
    this.editForm.patchValue({
      id: posts.id,
      title: posts.title,
      image: posts.image,
      content: posts.content,
      category: posts.category
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const posts = this.createFromForm();
    if (posts.id !== undefined) {
      this.subscribeToSaveResponse(this.postsService.update(posts));
    } else {
      this.subscribeToSaveResponse(this.postsService.create(posts));
    }
  }

  private createFromForm(): IPosts {
    return {
      ...new Posts(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      image: this.editForm.get(['image'])!.value,
      content: this.editForm.get(['content'])!.value,
      category: this.editForm.get(['category'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPosts>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
