<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Provider
 *
 * @property int $id
 * @property string $provider
 * @property string $provider_id
 * @property int $user_id
 * @property string|null $avatar
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static Builder|Provider newModelQuery()
 * @method static Builder|Provider newQuery()
 * @method static Builder|Provider query()
 * @method static Builder|Provider whereAvatar($value)
 * @method static Builder|Provider whereCreatedAt($value)
 * @method static Builder|Provider whereId($value)
 * @method static Builder|Provider whereProvider($value)
 * @method static Builder|Provider whereProviderId($value)
 * @method static Builder|Provider whereUpdatedAt($value)
 * @method static Builder|Provider whereUserId($value)
 */
final class Provider extends Model
{
    use HasFactory;

    protected $fillable = ['provider', 'provider_id', 'user_id', 'avatar'];

    protected $hidden = ['created_at', 'updated_at'];
}
