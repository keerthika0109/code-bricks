<?php

namespace App\Exceptions;

use Exception;

/**
 * Base exception for all predictable, "expected" application errors
 * (not found, validation, forbidden, etc.). Services and repositories
 * throw these instead of generic Exceptions so the global Handler
 * can turn them into the standard JSON error envelope without any
 * try/catch boilerplate inside controllers.
 */
class ApiException extends Exception
{
    protected int $statusCode;
    protected string $errorCode;
    protected ?array $errors;

    public function __construct(
        string $message = 'An error occurred',
        int $statusCode = 400,
        string $errorCode = 'BAD_REQUEST',
        ?array $errors = null
    ) {
        parent::__construct($message);
        $this->statusCode = $statusCode;
        $this->errorCode = $errorCode;
        $this->errors = $errors;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getErrorCode(): string
    {
        return $this->errorCode;
    }

    public function getErrors(): ?array
    {
        return $this->errors;
    }
}
