<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Faucetpay\HandleListContract;
use Illuminate\Console\Command;

class UpdateFaucetList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-faucet-list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update FaucetPay List';

    /**
     * Execute the console command.
     */
    public function handle(
        FaucetPayServiceInterface $service,
        HandleListContract $listContract
    ): void {
        $service->list()->make_list(
            listContract: $listContract
        );
    }
}
