<?php

declare(strict_types=1);

namespace App\Services\Settings\Data;

use App\Services\Settings\Casts\FormEnumCast;
use App\Services\Settings\Enums\FormEnum;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('FormData')]
class FormData extends Data
{
    public function __construct(
        public ?string $label,
        public ?string $name,
        #[WithCast(FormEnumCast::class)]
        public FormEnum $type,
        public Optional|array $options
    ) {
    }
}
