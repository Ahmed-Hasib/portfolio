<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertContactRequest;
use App\Models\Contact;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ContactController extends Controller
{
    public function index(): View
    {
        return view('admin.contacts.index', [
            'contacts' => Contact::query()
                ->with('profile')
                ->latest()
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.contacts.form', [
            'contact' => new Contact(['status' => 'new']),
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.contacts.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create contact submission',
            'submitLabel' => 'Create contact',
        ]);
    }

    public function store(UpsertContactRequest $request): RedirectResponse
    {
        Contact::query()->create($request->validated());

        return redirect()->route('admin.contacts.index')->with('status', 'Contact entry created successfully.');
    }

    public function edit(Contact $contact): View
    {
        return view('admin.contacts.form', [
            'contact' => $contact,
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.contacts.update', $contact),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit contact submission',
            'submitLabel' => 'Update contact',
        ]);
    }

    public function update(UpsertContactRequest $request, Contact $contact): RedirectResponse
    {
        $contact->update($request->validated());

        return redirect()->route('admin.contacts.index')->with('status', 'Contact entry updated successfully.');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')->with('status', 'Contact entry deleted successfully.');
    }
}
