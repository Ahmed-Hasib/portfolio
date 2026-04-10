<?php

namespace App\Http\Controllers;

use App\Services\HomePageService;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function __construct(
        private readonly HomePageService $homePageService,
    ) {
    }

    public function __invoke(): View
    {
        return view('app', $this->homePageService->buildPageData());
    }
}
