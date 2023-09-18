<?php

namespace App\Console\Commands;

use File;
use Illuminate\Console\Command;
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
      file_put_contents(base_path('/frontend/src/data/ziggy.json'), $ziggy);

      $this->info(
        'Added Successfully and path:' . File::dirname(
          base_path('/frontend/src/data/ziggy.json')
        )
      );
    } catch (Throwable $e) {
      $this->info($e->getMessage());
    }
  }
}
