<?php

namespace Tests\Feature;

use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    public function test_the_admin_login_page_is_accessible(): void
    {
        $response = $this->get('/admin/login');

        $response
            ->assertOk()
            ->assertSee('Admin Login');
    }

    public function test_guest_users_are_redirected_to_the_admin_login_page(): void
    {
        $response = $this->get('/admin/dashboard');

        $response->assertRedirect(route('admin.login'));
    }
}
