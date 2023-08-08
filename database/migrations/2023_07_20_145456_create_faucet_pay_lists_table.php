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
        Schema::create('faucet_pay_lists', function (Blueprint $table): void {
            $table->id();
            $table->string('list_name');
            $table->string('currency')->nullable();
            $table->json('coin_data')->nullable();
            $table->json('list_data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faucet_pay_lists');
    }
};
