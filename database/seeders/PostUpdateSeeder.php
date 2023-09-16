<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

final class PostUpdateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $img = fake()->imageUrl(width: 1200, height: 600);
        $imgUrl = "![image]({$img})";
        $headings = '###' . ' ' . Str::headline(fake()->text(25));
        $pa = fake()->paragraphs(nb: 3, asText: true);
        $title = '##' . ' ' . Str::headline(fake()->text(30));
        $secTitle = '##' . ' ' . Str::headline(fake()->text(30));
        $thTitle = '##' . ' ' . Str::headline(fake()->text(30));
        $secHeading = '###' . ' ' . Str::headline(fake()->text(25));
        $content = fake()->paragraphs(4, true);
        $text = Str::of($title)
            ->newLine(2)
            ->append($pa)
            ->newLine(2)
            ->append($secTitle)
            ->newLine()
            ->append($imgUrl)
            ->newLine(2)
            ->append($headings)
            ->newLine(2)
            ->append($content)
            ->newLine(2)
            ->append($thTitle)
            ->newLine()
            ->append($imgUrl)
            ->newLine()
            ->append($secHeading)
            ->newLine(2)
            ->append($content);
        $posts = Post::query()->whereNotIn('id', [14, 16, 22])->get();
        $posts->map(function (Post $post) use ($text): void {
            $post->content = $text;
            $post->save();
        });
    }
}
