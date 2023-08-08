<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::factory()->count(300)
            ->create()
        ;
        $posts->map(function (Post $post): void {
            $post->tags()->attach(Tag::all()->random());
            $post->links = [
                'post_link' => '/learn-crypto/' . $post->category->slug . '/' . $post->slug,
                'next' => Post::query()->ofNext($post->id),
                'prev' => Post::query()->ofPrev($post->id),
            ];
            $post->save();
        });

    }
}
