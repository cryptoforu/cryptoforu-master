<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Site\SocialLinksContract;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    protected PageInterface $page;

    protected SocialLinksContract $social;

    protected User $user;

    /**
     * Admin Profile
     */
    public function __construct(
        PageInterface $page,
        SocialLinksContract $social,
        User $user,
    ) {
        $this->page = $page;
        $this->social = $social;
        $this->user = $user;
    }

    public function __invoke(Request $request): Response
    {
        return Inertia::render(
            component: 'Admin/Profile/Index',
            props: [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'social' => $this->social->handle(),
                'token' => $request->session()->get('token'),
                ...$this->page->admin_meta(),
            ]
        );
    }
}
