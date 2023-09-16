<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Faucetpay\DataObjects\FaucetData;
use Cerbero\JsonParser\JsonParser;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Laravel\Scout\Searchable;
use Spatie\LaravelData\WithData;
use Sushi\Sushi;

/**
 * App\Models\FaucetList
 *
 * @property string|null $name
 * @property string|null $url
 * @property string|null $currency
 * @property float|null $timer_in_minutes
 * @property float|null $reward
 * @property float|null $reward_coin
 * @property DateTime|null $creation_date
 * @property float|null $paid_today
 * @property float|null $paid_today_coin
 * @property float|null $total_users_paid
 * @property float|null $active_users
 * @property float|null $balance
 * @property float|null $health
 * @property string|null $listCategory
 * @property-read FaucetListCategory|null $list_category
 *
 * @method static Builder|FaucetList newModelQuery()
 * @method static Builder|FaucetList newQuery()
 * @method static Builder|FaucetList query()
 * @method static Builder|FaucetList whereActiveUsers($value)
 * @method static Builder|FaucetList whereBalance($value)
 * @method static Builder|FaucetList whereCreationDate($value)
 * @method static Builder|FaucetList whereCurrency($value)
 * @method static Builder|FaucetList whereHealth($value)
 * @method static Builder|FaucetList whereName($value)
 * @method static Builder|FaucetList wherePaidToday($value)
 * @method static Builder|FaucetList wherePaidTodayCoin($value)
 * @method static Builder|FaucetList whereReward($value)
 * @method static Builder|FaucetList whereRewardCoin($value)
 * @method static Builder|FaucetList whereTimerInMinutes($value)
 * @method static Builder|FaucetList whereTotalUsersPaid($value)
 * @method static Builder|FaucetList whereUrl($value)
 * @method static Builder|FaucetList columns()
 */
final class FaucetList extends Model
{
    use Searchable;
    use Sushi;
    use WithData;

    protected string $dataClass = FaucetData::class;

    public function list_category(): BelongsTo
    {
        return $this->belongsTo(
            FaucetListCategory::class,
            'listCategory',
            'symbol'
        );
    }

    public function getRows(): array
    {
        return $this->getFaucets();
    }

    public function scopeColumns(Builder $query): null|Builder|Model
    {
        return $query->first(['name', 'paid_today', 'active_users', 'reward',
            'timer_in_minutes', 'health', 'url']);
    }

    public function toSearchableArray(): array
    {
        return [
            'title' => $this->name,
        ];
    }

    protected function sushiShouldCache(): true
    {
        return true;
    }

    protected function sushiCacheReferencePath(): string
    {
        return storage_path('app/list/list_data.json');
    }

    private function getFaucets(): array
    {

        return Cache::remember(
            'faucet_list',
            now()->addMinutes(20),
            function () {
                return Arr::collapse(
                    array: JsonParser::parse(
                        storage_path('app/list/list_data.json')
                    )->toArray()
                );
            }
        );
    }
}
