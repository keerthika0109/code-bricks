<?php

namespace App\Services\Snippet;

use App\Exceptions\NotFoundException;
use App\Models\Design;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class SnippetService implements SnippetInterface
{
    protected string $disk = 'snippets';

    public function readSnippetFiles(Design $design): array
    {
        $storage = Storage::disk($this->disk);
        $base = $design->storage_path;

        if (!$storage->exists("{$base}/index.html")) {
            throw new NotFoundException('Snippet files for this design are missing on disk.');
        }

        return [
            'html' => $storage->get("{$base}/index.html"),
            'css' => $storage->exists("{$base}/style.css") ? $storage->get("{$base}/style.css") : '',
            'js' => $storage->exists("{$base}/script.js") ? $storage->get("{$base}/script.js") : '',
        ];
    }

    public function applyCustomization(Design $design, array $overrides): array
    {
        $files = $this->readSnippetFiles($design);

        if (empty($overrides)) {
            return $files;
        }

        $allowedKeys = array_keys($design->customizable_vars ?? []);
        // Only allow overriding variables the design explicitly declared as
        // customizable — prevents arbitrary CSS injection from the client.
        $safeOverrides = array_intersect_key($overrides, array_flip($allowedKeys));

        if (empty($safeOverrides)) {
            return $files;
        }

        $files['css'] = $this->patchRootVariables($files['css'], $safeOverrides);

        return $files;
    }

    public function buildZip(Design $design, array $overrides = []): string
    {
        $files = $this->applyCustomization($design, $overrides);

        $tmpDir = storage_path('app/tmp');
        if (!is_dir($tmpDir)) {
            mkdir($tmpDir, 0775, true);
        }

        $zipPath = $tmpDir . '/' . $design->slug . '-' . uniqid() . '.zip';

        $zip = new ZipArchive();
        $zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE);
        $zip->addFromString('index.html', $files['html']);
        $zip->addFromString('style.css', $files['css']);
        $zip->addFromString('script.js', $files['js']);
        $zip->addFromString('README.txt', "Downloaded from CodeBricks — {$design->title}\nSection: {$design->section->name}\n\nJust open index.html in your browser. That's it.");
        $zip->close();

        return $zipPath;
    }

    public function writeSnippetFiles(string $storagePath, string $html, string $css, string $js): void
    {
        $storage = Storage::disk($this->disk);
        $storage->put("{$storagePath}/index.html", $html);
        $storage->put("{$storagePath}/style.css", $css);
        $storage->put("{$storagePath}/script.js", $js);
    }

    public function deleteSnippetFiles(string $storagePath): void
    {
        Storage::disk($this->disk)->deleteDirectory($storagePath);
    }

    /**
     * Safely overrides CSS custom properties inside a :root{} block.
     * If no :root block exists, one is appended at the very end of the
     * stylesheet instead.
     *
     * IMPORTANT: declarations must be injected at the END of the :root
     * block (just before its closing `}`), not the start. CSS resolves
     * duplicate custom-property declarations by source order — the LAST
     * one wins. The design's own default (e.g. `--primary-color: #6366f1;`)
     * already lives inside that same :root block. If our override were
     * placed before it, the design's default would always come later in
     * the source and silently win, making the customizer look broken
     * (user picks a color, nothing changes). Appending at the end
     * guarantees our override is always the final, winning declaration.
     *
     * @param array<string,string> $overrides
     */
    protected function patchRootVariables(string $css, array $overrides): string
    {
        $declarations = '';
        foreach ($overrides as $variable => $value) {
            $safeValue = preg_replace('/[{};]/', '', $value); // strip CSS-breaking chars
            $declarations .= "  {$variable}: {$safeValue};\n";
        }

        if (preg_match('/:root\s*{/', $css, $matches, PREG_OFFSET_CAPTURE)) {
            // Find the matching closing brace for this specific :root block
            // (not just the next "}", in case of nested rules — though :root
            // never legally contains nested rules in plain CSS, this is a
            // defensive, correct brace-matching scan rather than a naive regex).
            $openBracePos = strpos($css, '{', $matches[0][1]);
            $depth = 1;
            $pos = $openBracePos + 1;
            $len = strlen($css);

            while ($pos < $len && $depth > 0) {
                if ($css[$pos] === '{') {
                    $depth++;
                } elseif ($css[$pos] === '}') {
                    $depth--;
                }
                $pos++;
            }

            $closingBracePos = $pos - 1; // position of the matching '}'

            return substr($css, 0, $closingBracePos)
                . $declarations
                . substr($css, $closingBracePos);
        }

        return ":root {\n{$declarations}}\n\n" . $css;
    }
}
