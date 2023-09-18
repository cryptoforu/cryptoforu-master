<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Throwable;
use Tightenco\Ziggy\Ziggy;

class WriteZiggy extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:write-ziggy';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Command description';

  /**
   * Execute the console command.
   */
  public function handle(): void
  {
    try {
      $ziggy = (new Ziggy(
        group: 'api',
        url: '',
      ))->toJson();
      Storage::write(
        base_path('frontend/src/data/ziggy.json'),
        $ziggy
      );
      $this->info('Added Succsfully');
    } catch (Throwable $e) {
      $this->info($e->getMessage());
    }
  }
}
