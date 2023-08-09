<?php

declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self BTC()
 * @method static self ETH()
 * @method static self DOGE()
 * @method static self LTC()
 * @method static self BCH()
 * @method static self DASH()
 * @method static self DGB()
 * @method static self TRX()
 * @method static self USDT()
 * @method static self FEY()
 * @method static self ZEC()
 * @method static self BNB()
 * @method static self SOL()
 * @method static self XRP()
 * @method static self MATIC()
 */
final class CoinColorsEnum extends Enum
{
    public function color(): string
    {
        return match ($this) {
            self::BTC() => 'rgba(242, 169, 0, 1)',
            self::ETH() => 'rgba(73, 116, 147, 1)',
            self::DOGE() => 'rgba(217, 192, 104, 1)',
            self::LTC() => 'rgba(52, 93, 157, 1)',
            self::BCH() => 'rgba(10, 193, 142, 1)',
            self::DASH() => 'rgba(19, 118, 181, 1)',
            self::DGB() => 'rgba(0, 35, 82, 1)',
            self::TRX() => 'rgba(235, 0, 41, 1)',
            self::USDT() => 'rgba(38, 161, 123, 1)',
            self::FEY() => 'rgba(0, 0, 0, 1)',
            self::ZEC() => 'rgba(244, 183, 40, 1)',
            self::BNB() => 'rgba(243, 186, 47, 1)',
            self::SOL() => 'rgba(220, 31, 255, 1)',
            self::XRP() => 'rgba(67, 76, 84, 1)',
            self::MATIC() => 'rgba(130, 71, 229, 1)'
        };
    }
}
