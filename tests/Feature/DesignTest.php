<?php

namespace Tests\Feature;

use App\Models\Design;
use App\Models\Section;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DesignTest extends TestCase
{
    use RefreshDatabase;

    protected function makeDesignWithFiles(): Design
    {
        Storage::fake('snippets');

        $section = Section::factory()->create(['slug' => 'buttons', 'name' => 'Buttons']);

        Storage::disk('snippets')->put('buttons/test-button/index.html', '<button class="btn">Click</button>');
        Storage::disk('snippets')->put('buttons/test-button/style.css', ":root{--primary-color:#000;}\n.btn{color:var(--primary-color);}");
        Storage::disk('snippets')->put('buttons/test-button/script.js', "console.log('hi');");

        return Design::factory()->create([
            'section_id' => $section->id,
            'title' => 'Test Button',
            'slug' => 'test-button',
            'storage_path' => 'buttons/test-button',
            'customizable_vars' => ['--primary-color' => '#000'],
        ]);
    }

    public function test_can_list_published_designs(): void
    {
        $this->makeDesignWithFiles();

        $response = $this->getJson('/api/v1/designs?section_slug=buttons');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'data');
    }

    public function test_can_view_design_detail_with_code(): void
    {
        $design = $this->makeDesignWithFiles();

        $response = $this->getJson("/api/v1/designs/{$design->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.code.html', '<button class="btn">Click</button>')
            ->assertJsonPath('data.design.title', 'Test Button');
    }

    public function test_preview_applies_customizer_overrides_safely(): void
    {
        $design = $this->makeDesignWithFiles();

        $response = $this->postJson("/api/v1/designs/{$design->id}/preview", [
            'overrides' => ['--primary-color' => '#ff0000'],
        ]);

        $response->assertStatus(200);
        $css = $response->json('data.css');
        $this->assertStringContainsString('--primary-color: #ff0000', $css);
    }

    /**
     * Regression test for the bug where the customizer appeared to "do
     * nothing": the override was injected at the START of the :root
     * block, before the design's own default declaration of the same
     * variable. CSS resolves duplicate custom properties by source
     * order — the LAST declaration wins — so the design's own default
     * (declared after our override) silently won every time, and the
     * user's chosen color never actually applied. This test asserts
     * the override is the LAST occurrence of the variable, not merely
     * present somewhere in the string.
     */
    public function test_preview_override_wins_over_designs_own_default_by_source_order(): void
    {
        $design = $this->makeDesignWithFiles(); // base CSS already declares --primary-color: #000

        $response = $this->postJson("/api/v1/designs/{$design->id}/preview", [
            'overrides' => ['--primary-color' => '#ff0000'],
        ]);

        $response->assertStatus(200);
        $css = $response->json('data.css');

        preg_match_all('/--primary-color:\s*([^;]+);/', $css, $matches);

        $this->assertNotEmpty($matches[1], 'Expected at least one --primary-color declaration in the patched CSS.');
        $this->assertSame(
            '#ff0000',
            trim(end($matches[1])),
            'The customizer override must be the LAST --primary-color declaration so it wins the CSS cascade — otherwise the design\'s own default silently overrides the user\'s chosen color.'
        );
    }

    public function test_preview_ignores_non_whitelisted_css_variables(): void
    {
        $design = $this->makeDesignWithFiles();

        $response = $this->postJson("/api/v1/designs/{$design->id}/preview", [
            'overrides' => ['--not-allowed' => 'evil'],
        ]);

        $response->assertStatus(200);
        $css = $response->json('data.css');
        $this->assertStringNotContainsString('evil', $css);
    }

    public function test_viewing_nonexistent_design_returns_404_envelope(): void
    {
        $response = $this->getJson('/api/v1/designs/99999');

        $response->assertStatus(404)
            ->assertJsonPath('success', false)
            ->assertJsonPath('error_code', 'NOT_FOUND');
    }
}
