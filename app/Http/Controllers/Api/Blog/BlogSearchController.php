<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $posts = Post::search(trim($request->get('q')) ?? '')
            ->query(function ($query): void {
                $query->join('categories', 'posts.category_id', 'categories.id')
                    ->select([
                        'posts.id', 'posts.title', 'posts.introduction',
                        'categories.name as category',
                    ])
                    ->orderBy('posts.id', 'DESC')
                ;
            })
            ->get()
        ;

        return response()->json(data: $posts, status: 200);
    }
}
