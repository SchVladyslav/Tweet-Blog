import { Component, OnInit } from '@angular/core';
import { PostInterface } from '../../interfaces/post.interface';

import { PostsService } from '../../services/posts.service';
import { ModalService } from '../../services/modal.service';
//import { ImageService } from '../../services/image.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedFile: ImageSnippet;
  description: string;
  posts: PostInterface[];

  post: PostInterface = {
    date: new Date(),
    description: ''
  };
  //private imageService: ImageService,
  constructor(private postsService: PostsService, private modalService: ModalService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PostInterface;
      })
    });
  }

  onSubmit(): void {
    this.selectedFile ? this.post.image = this.selectedFile.src : this.post;
    console.log(this.post);
    this.postsService.addPost(this.post);
    this.post.description = '';
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  // openDialog(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      //   this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //     (res) => {

      //     },
      //     (err) => {

      //     })
    });
    reader.readAsDataURL(file);
  }
}