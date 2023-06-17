<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostStatusRequest;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Interfaces\Blog\BlogActionInterface;
use App\Interfaces\Blog\BlogInterface;
use App\Models\Post;
use App\Responses\ErrorResponse;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

final class PostController extends Controller
{
    protected BlogInterface $blog;

    protected BlogActionInterface $action;

    public function __construct(
        BlogInterface $blog,
        BlogActionInterface $action,
    ) {
        $this->blog = $blog;
        $this->action = $action;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render(
            component: 'Admin/Blog/PostIndex',
            props: $this->blog->forIndex()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render(
            component: 'Admin/Blog/Create',
            props: $this->blog->forCreate()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $this->action->store(
            request: $request
        );

        return to_route('admin-blog')->with(
            'success',
            'Created a new Post Successfully'
        );
    }

    /**
     * Set Post Status
     */
    public function status(
        PostStatusRequest $request,
        Post $post,
    ): RedirectResponse {
        $post->status = $request->validated('status');
        $post->save();

        return back()->with('success', 'Status Updated Successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        return Inertia::render(
            component: 'Admin/Blog/Edit',
            props: $this->blog->forEdit(
                post: $post
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @throws Exception
     */
    public function update(
        UpdatePostRequest $request,
        Post $post
    ): RedirectResponse|ErrorResponse {
        try {
            $this->action->update(
                request: $request,
                post: $post,
            );
        } catch (Throwable $e) {
            session(['warning', 'Something Went Wrong']);

            return new ErrorResponse(message: '', exception: $e);
        }

        return to_route('admin-blog')->with('success', 'Updated Post Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        if ($post->exists) {
            Storage::delete([$post->featured_image, $post->thumb]);
            $post->delete();
        }

        return back()->with('success', 'Deleted Successfully');
    }
}
