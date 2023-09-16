<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Responses\CollectionResponse;
use Illuminate\Http\Request;

final class BlogSearchController extends Controller
{
    // TO DO
    // IMPLEMENT MORE SEARCH METHODS
    /**
     * Search All Posts by Their Title
     */
    public function __invoke(Request $request): CollectionResponse
    {
        $posts = Post::search(trim($request->get('q')) ?? '')
            ->query(function ($query): void {
                $query->join('categories', 'posts.category_id', 'categories.id')
                    ->select([
                        'posts.id', 'posts.title', 'posts.introduction',
                        'categories.name as category',
                    ])
                    ->orderBy('posts.id', 'DESC');
            })
            ->get();

        return new CollectionResponse(
            data: $posts
        );
    }
}
