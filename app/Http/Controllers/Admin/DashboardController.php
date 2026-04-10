<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Gallery;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        return view('admin.dashboard', [
            'stats' => [
                'Profiles' => Profile::query()->count(),
                'Skills' => Skill::query()->count(),
                'Experiences' => Experience::query()->count(),
                'Educations' => Education::query()->count(),
                'Projects' => Project::query()->count(),
                'Galleries' => Gallery::query()->count(),
                'Social Links' => SocialLink::query()->count(),
                'Contacts' => Contact::query()->count(),
            ],
            'recentContacts' => Contact::query()
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
