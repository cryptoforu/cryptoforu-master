<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Cache;

final class PostObserver
{
  /**
   * Handle events after all transactions are committed.
   */
  public bool $afterCommit = true;

  /**
   * Handle the Post "created" event.
   */
  public function created(): void
  {
    cookie('created', now()->toDateString(), 1);
    Cache::tags(['posts', 'data'])->flush();
  }

  /**
   * Handle the Post "updated" event.
   */
  public function updated(): void
  {
    cookie('created', now()->toDateString(), 1);
    Cache::tags(['posts', 'data'])->flush();
  }

  /**
   * Handle the Post "deleted" event.
   */
  public function deleted(): void
  {
    Cache::tags(['posts', 'data'])->flush();
  }

  /**
   * Handle the Post "restored" event.
   */
  public function restored(Post $post): void
  {

  }

  /**
   * Handle the Post "force deleted" event.
   */
  public function forceDeleted(Post $post): void
  {

  }
}
