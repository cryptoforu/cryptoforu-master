<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSiteDataRequest;
use App\Interfaces\Site\DeleteDataContract;
use App\Interfaces\Site\SiteInterface;
use App\Interfaces\Site\StoreDataContract;
use App\Responses\RedirectSuccess;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class SiteController extends Controller
{

    public function __construct(
        protected StoreDataContract $store,
        protected SiteInterface $site,
        protected DeleteDataContract $delete,
    ) {

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(
            component:'Admin/Site/SiteIndex',
            props:$this->site->forIndex(),
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            component:'Admin/Site/SiteCreate',
            props:$this->site->forCreate(),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiteDataRequest $request)
    {
        try {
            $this->store->handle(
                request:$request,
            );
            return new RedirectSuccess(
                url:'site.index',
                message:'Stored Data Successfully'
            );
        } catch (Throwable $e) {
            report($e);
            return false;
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function delete(Request $request)
    {
        $this->delete->handle(
            request:$request,
        );
        return new RedirectSuccess(
            url:'site.index',
            message:'Deleted Data Successfully'
        );
    }
}
