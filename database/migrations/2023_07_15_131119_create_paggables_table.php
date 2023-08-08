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
        Schema::create('paggables', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('page_id')->constrained()->onDelete('cascade');
            $table->integer('paggable_id');
            $table->string('paggable_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paggables');
    }
};
