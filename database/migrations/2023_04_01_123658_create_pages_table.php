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
        Schema::create('pages', function (Blueprint $table): void {
            $table->id();
            $table->string('label');
            $table->string('route')->nullable();
            $table->string('meta_desc');
            $table->string('meta_image')->nullable();
            $table->string('tw_image')->nullable();
            $table->string('og_image')->nullable();
            $table->bigInteger('parent_id')->default(0);
            $table->string('page_type');
            $table->string('page_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
