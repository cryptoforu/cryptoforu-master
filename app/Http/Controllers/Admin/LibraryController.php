<?php

declare (strict_types = 1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLibraryRequest;
use App\Http\Requests\UpdateLibraryRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Interfaces\Library\LibraryDeleteContract;
use App\Interfaces\Library\LibraryResourceInterface;
use App\Models\Library;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class LibraryController extends Controller
{
    /**
     * Library Controller Instance
     *
     * @param LibraryResourceInterface $library
     */
    public function __construct(
        protected LibraryResourceInterface $library,
        protected LibraryActionsInterface $action,
        protected LibraryDeleteContract $delete,
    ) {}

    /**
     * Index Page Resource
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render(
            component:'Admin/Library/LibraryIndex',
            props:$this->library->forIndex(),
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render(
            component:'Admin/Library/LibraryCreate',
            props:$this->library->forCreate(),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLibraryRequest $request): RedirectResponse
    {
        $this->action->create(
            request:$request
        );
        return to_route('admin-library.index')->with('success', 'Uploaded Succesfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Library $library): void
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Library $library): void
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLibraryRequest $request, Library $library): void
    {
    }

    public function destroyMultiple(Request $request)
    {

        $request->collect('selected')->except([0])
            ->map(fn($lib) => $this->delete->handle(Library::find($lib['id'])));
        cache()->store('library')->clear();
        return back()->with('success', 'Deleted Succesfuly');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Library $library): RedirectResponse
    {
        try {
            $this->delete->handle(
                library:$library
            );
            $library->delete();
        } catch (Throwable $e) {
            report($e);
            session()->now('warning', 'Something Went Wrong');
        }

        return back()->with('success', 'Deleted Succsfully');
    }

    public function process(Request $request): string
    {
        // We don't know the name of the file input, so we need to grab
        // all the files from the request and grab the first file.
        /** @var UploadedFile[] $files */
        $files = $request->allFiles();

        if (empty($files)) {
            abort(422, 'No files were uploaded.');
        }

        // Now that we know there's only one key, we can grab it to get
        // the file from the request.
        $requestKey = array_key_first($files);

        // If we are allowing multiple files to be uploaded, the field in the
        // request will be an array with a single file rather than just a
        // single file (e.g. - `csv[]` rather than `csv`). So we need to
        // grab the first file from the array. Otherwise, we can assume
        // the uploaded file is for a single file input and we can
        // grab it directly from the request.
        $file = is_array($request->input($requestKey))
        ? $request->file($requestKey)[0]
        : $request->file($requestKey);

        // Store the file in a temporary location and return the location
        // for FilePond to use.
        return $file->store(
            path:'tmp/' . now()->timestamp . '-' . Str::random(20)
        );
    }
}
