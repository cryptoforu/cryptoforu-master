<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Faucetpay\DataObjects\FaucetListCategoryData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\LaravelData\WithData;
use Sushi\Sushi;

/**
 * App\Models\FaucetListCategory
 *
 * @property int $id
 * @property string|null $symbol
 * @property string|null $name
 * @property string|null $image
 * @property string|null $color
 * @property-read Collection<int, FaucetList> $list
 * @property-read int|null $list_count
 *
 * @method static Builder|FaucetListCategory newModelQuery()
 * @method static Builder|FaucetListCategory newQuery()
 * @method static Builder|FaucetListCategory query()
 * @method static Builder|FaucetListCategory whereColor($value)
 * @method static Builder|FaucetListCategory whereId($value)
 * @method static Builder|FaucetListCategory whereImage($value)
 * @method static Builder|FaucetListCategory whereName($value)
 * @method static Builder|FaucetListCategory whereSymbol($value)
 */
final class FaucetListCategory extends Model
{
    use Sushi;
    use WithData;

    protected string $dataClass = FaucetListCategoryData::class;

    protected array $rows = [
        [
            'symbol' => 'TOP',
            'name' => 'Top 100',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/cent_240px_7hD1tpq9q.png?tr=n-icon128',
            'color' => 'rgba(242, 169, 0, 1)',
        ],
        [
            'symbol' => 'NEW',
            'name' => 'New Faucets',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/new_240px_VoyVkQAvR.png?tr=n-icon128',
            'color' => 'rgba(242, 169, 0, 1)',
        ],
        [
            'symbol' => 'BTC',
            'name' => 'Bitcoin',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/btc_Io4azs465.png?updatedAt=1693244920966',
            'color' => 'rgba(242, 169, 0, 1)',
        ],
        [
            'symbol' => 'ETH',
            'name' => 'Ethereum',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/eth_GtUZS1RQf.png?updatedAt=1693244920992',
            'color' => 'rgba(73, 116, 147, 1)',
        ],
        [
            'symbol' => 'DOGE',
            'name' => 'Dogecoin',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/doge_wBdvXFxwV.png?updatedAt=1693244920944',
            'color' => 'rgba(217, 192, 104, 1)',
        ],
        [
            'symbol' => 'LTC',
            'name' => 'Litecoin',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/ltc_8nOpBbRHM.png?updatedAt=1693244923270',
            'color' => 'rgba(52, 93, 157, 1)',
        ],
        [
            'symbol' => 'BCH',
            'name' => 'Bitcoin Cash',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/bch_ffrfcP9XTH.png?updatedAt=1693244920987',
            'color' => 'rgba(10, 193, 142, 1)',
        ],
        [
            'symbol' => 'DASH',
            'name' => 'Dash',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/dash_kTxrIZ0sBo.png?updatedAt=1693244920960',
            'color' => 'rgba(19, 118, 181, 1)',
        ],
        [
            'symbol' => 'DGB',
            'name' => 'Digibyte',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/dgb_vSpqKntWH.png?updatedAt=1693244920974',
            'color' => 'rgba(0, 35, 82, 1)',
        ],
        [
            'symbol' => 'TRX',
            'name' => 'Tron',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/trx_BiKrWNdCs.png?updatedAt=1693244923342',
            'color' => 'rgba(235, 0, 41, 1)',
        ],
        [
            'symbol' => 'USDT',
            'name' => 'Tether',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/usdt_hGjhe4bH0.png?updatedAt=1693244923330',
            'color' => 'rgba(38, 161, 123, 1)',
        ],
        [
            'symbol' => 'FEY',
            'name' => 'Feyorra',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/fey-feyorra-logo_FtZ1uB6gm.png?tr=n-icon128',
            'color' => 'rgba(0, 0, 0, 1)',
        ],
        [
            'symbol' => 'ZEC',
            'name' => 'Zcash',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/zec_qAHNqtg4R9.png?updatedAt=1693244923528',
            'color' => 'rgba(244, 183, 40, 1)',
        ],
        [
            'symbol' => 'BNB',
            'name' => 'Binance Coin',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/bnb_D_c3UuPbn.png?updatedAt=1693244920859',
            'color' => 'rgba(243, 186, 47, 1)',
        ],
        [
            'symbol' => 'SOL',
            'name' => 'Solana',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/sol_fQ3TG-bYU.png?updatedAt=1693244923343',
            'color' => 'rgba(220, 31, 255, 1)',
        ],
        [
            'symbol' => 'XRP',
            'name' => 'Ripple',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/xrp_uEuWehlgv.png?updatedAt=1693244923308',
            'color' => 'rgba(67, 76, 84, 1)',
        ],
        [
            'symbol' => 'MATIC',
            'name' => 'Polygon',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/matic_j5sL1Maxt.png?updatedAt=1693244923352',
            'color' => 'rgba(130, 71, 229, 1)',
        ],
        [
            'symbol' => 'ADA',
            'name' => 'Cardano',
            'image' => 'https://ik.imagekit.io/cryptoforu/Crypto_Icons/128x128/ada_4fAR4EGkbO.png?updatedAt=1693244920938',
            'color' => 'rgba(0, 51, 173, 1)',
        ],

    ];

    public function list(): HasMany
    {
        return $this->hasMany(FaucetList::class, 'listCategory', 'symbol');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'symbol';
    }
}
