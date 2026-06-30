<?php

namespace App\Exceptions;

class ForbiddenException extends ApiException
{
    public function __construct(string $message = 'You do not have permission to perform this action.')
    {
        parent::__construct($message, 403, 'FORBIDDEN');
    }
}
