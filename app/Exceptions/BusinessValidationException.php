<?php

namespace App\Exceptions;

class BusinessValidationException extends ApiException
{
    public function __construct(array $errors, string $message = 'Validation failed')
    {
        parent::__construct($message, 422, 'VALIDATION_ERROR', $errors);
    }
}
