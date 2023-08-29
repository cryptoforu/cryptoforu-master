<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Post;
use App\Services\Blog\Enums\PostStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $img = fake()->imageUrl(width: 1200, height: 600);
        $imgUrl = "![image]({$img})";
        $headings = '###' . ' ' . Str::headline(fake()->text(15));
        $pa = fake()->paragraphs(nb: 2, asText: true);
        $title = '##' . ' ' . Str::headline(fake()->text(30));
        $secTitle = '##' . ' ' . Str::headline(fake()->text(30));
        $thTitle = '##' . ' ' . Str::headline(fake()->text(30));
        $secHeading = '###' . ' ' . Str::headline(fake()->text(15));
        $slug = Str::slug($title);
        $content = fake()->paragraphs(4, true);
        $headline = Str::headline($title);
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
            ->append($content)
        ;

        return [
            'title' => $title,
            'slug' => $slug,
            'introduction' => fake()->text(180),
            'content' => $text,
            'image_name' => Str::after(fake()->image(
                storage_path('app/images/posts'),
                1280,
                731
            ), 'posts/'),
            'excerpt' => fake()->text(200),
            'is_published' => fake()->numberBetween(0, 1),
            'category_id' => fake()->numberBetween(1, 8),
            'status' => PostStatus::PUBLISHED(),
            'headline' => $headline,

        ];
    }
}
