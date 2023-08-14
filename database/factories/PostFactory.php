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
        $title = fake()->text(30);
        $slug = Str::slug($title);
        $content = fake()->paragraphs(20, true);
        $headline = Str::headline($title);

        return [
            'title' => $title,
            'slug' => $slug,
            'introduction' => fake()->text(180),
            'content' => $content,
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
