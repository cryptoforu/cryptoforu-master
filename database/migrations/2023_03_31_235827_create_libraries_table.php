<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('libraries', function (Blueprint $table): void {
            $table->id();
            $table->string('file_name');
            $table->string('mime_type')->nullable();
            $table->json('conversions');
            $table->string('size');
            $table->bigInteger('width');
            $table->bigInteger('height');
            $table->string('image_url');
            $table->foreignId('library_category_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('libraries');
    }
};
