import { Component, OnInit } from '@angular/core';
import { PostInterface } from '../../../interfaces/post.interface';

import { PostsService } from '../../../services/posts.service';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  selectedFile: ImageSnippet;
  description: string;
  posts: PostInterface[];

  post: PostInterface = {
    date: new Date().toISOString(),
    description: '',
    author: '',
    authorImage: '',
  };

  constructor(private authService: AuthService, private postsService: PostsService, private modalService: ModalService) { }

  get authServiceAccess() { // for production
    return this.authService;
  }

  ngOnInit() {
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PostInterface;
      })
    });

    this.form = new FormGroup({
      inputArea: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  onSubmit(): void {
    this.formData();

    this.postsService.addPost(this.post);
    this.post.description = '';
    this.selectedFile = null;
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  processFile(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  formData() {
    this.selectedFile ? this.post.image = this.selectedFile.src : this.post;
    this.post.author = this.authService.userData.displayName;
    this.post.authorImage = this.authService.userData.photoURL;

    this.post.comments = this.randNumbers();
    this.post.share = this.randNumbers();
    this.post.likes = this.randNumbers();
  }

  randNumbers(): number {
    return Math.floor((Math.random() * 1000) + 1);
  }
}