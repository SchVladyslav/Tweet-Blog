import { Component, Input } from "@angular/core";
import { PostInterface } from "../../interfaces/post.interface";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent {
  @Input() post: PostInterface;
  editState: boolean = false;
  postToEdit: PostInterface;

  constructor(private postsService: PostsService) { }

  editPost(post: PostInterface) {
    this.editState = true;
    this.postToEdit = post;
  }

  updatePost(post: PostInterface) {
    this.postsService.updatePost(post);
    this.clearState();
  }

  deletePost(post: PostInterface) {
    this.clearState();
    this.postsService.deletePost(post);
    //event.target.id;
  }

  clearState() {
    this.editState = false;
    this.postToEdit = null;
  }
}
