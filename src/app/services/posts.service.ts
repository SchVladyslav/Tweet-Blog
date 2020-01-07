import { Injectable } from "@angular/core";
import { PostInterface } from "../interfaces/post.interface";
import { Observable } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: "root"
})
export class PostsService {
  postDoc: AngularFirestoreDocument<PostInterface>;
  postsCollection: AngularFirestoreCollection<PostInterface>;
  posts: Observable<PostInterface[]>;

  constructor(public afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('date', 'desc'));
    //this.posts = this.afs.collection('posts').valueChanges(); 
  }

  getPosts() {
    return this.postsCollection.snapshotChanges();
  }

  addPost(post: PostInterface) {
    this.postsCollection.add(post);
  }

  updatePost(post: PostInterface) {
    this.postDoc = this.afs.doc(`posts/${post.id}`);
    this.postDoc.update(post);
  }

  deletePost(post: PostInterface) {
    this.postDoc = this.afs.doc(`posts/${post.id}`);
    this.postDoc.delete();
  }
}
