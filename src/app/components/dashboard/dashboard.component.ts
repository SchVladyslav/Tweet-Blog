import { Component, OnInit } from '@angular/core';
import { PostInterface } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  description: string;
  posts: PostInterface[];

  post: PostInterface = {
    date: new Date(),
    description: ''
  };

  constructor(private postsService: PostsService, private authService: AuthService) { }

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
    this.postsService.addPost(this.post);
    this.post.description = '';
  }
}