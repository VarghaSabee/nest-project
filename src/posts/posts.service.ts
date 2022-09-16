import { Injectable } from '@nestjs/common';
import { Post } from './post.interface';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

@Injectable()
export class PostService {
    private posts: Post[] = []

    findAll() {
        return this.posts
    }

    findById(id: number) {
        const index = this.posts.findIndex(p => p.id === id)

        if (index < 0) throw new Error("Not found")

        return this.posts[index]
    }

    create(post: Post) {
        const _post = {
            id: randomIntFromInterval(1, 1000),
            ...post
        }
        this.posts.push(_post)
        return _post
    }

    update(id: number, post: Post) {
        const index = this.posts.findIndex(p => p.id === id)

        if (index < 0) throw new Error("Not found")

        const _post = {
            ...this.posts[index],
            ...post
        }

        this.posts[index] = _post
        return _post
    }

    delete(id: number) {
        this.posts = this.posts.filter(p => p.id !== id)
    }

}