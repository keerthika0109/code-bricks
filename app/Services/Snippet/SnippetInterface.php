<?php

namespace App\Services\Snippet;

use App\Models\Design;

interface SnippetInterface
{
    /**
     * Read the raw html/css/js for a design straight off disk.
     *
     * @return array{html: string, css: string, js: string}
     */
    public function readSnippetFiles(Design $design): array;

    /**
     * Apply customizer overrides (e.g. {"--primary-color": "#ff0000"})
     * on top of the base CSS by injecting/overriding a :root block.
     * Returns the same shape as readSnippetFiles but with css patched.
     *
     * @param array<string,string> $overrides
     * @return array{html: string, css: string, js: string}
     */
    public function applyCustomization(Design $design, array $overrides): array;

    /**
     * Build a downloadable ZIP (index.html, style.css, script.js,
     * with css patched if overrides are supplied) and return the
     * absolute path to the generated zip file in a temp location.
     *
     * @param array<string,string> $overrides
     */
    public function buildZip(Design $design, array $overrides = []): string;

    /**
     * Persist new snippet files to disk for a freshly created design.
     * Used by the admin "add design" flow.
     */
    public function writeSnippetFiles(string $storagePath, string $html, string $css, string $js): void;

    public function deleteSnippetFiles(string $storagePath): void;
}
