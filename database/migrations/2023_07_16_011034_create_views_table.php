<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\Facades\Schema;

class CreateViewsTable extends Migration
{
    /**
     * The database schema.
     *
     * @var Schema
     */
    protected Builder|Schema $schema;

    /**
     * The table name.
     *
     * @var string
     */
    protected mixed $table;

    /**
     * Create a new migration instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->schema = Schema::connection(
            config('eloquent-viewable.models.view.connection')
        );

        $this->table = config('eloquent-viewable.models.view.table_name');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create($this->table, function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->morphs('viewable');
            $table->text('visitor')->nullable();
            $table->string('collection')->nullable();
            $table->timestamp('viewed_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->table);
    }
}
