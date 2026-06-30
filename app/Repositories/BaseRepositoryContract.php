<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * BaseRepositoryContract
 *
 * Every {Module}Contract interface extends this so all repositories
 * guarantee the same baseline CRUD surface. Module-specific contracts
 * then add their own domain-specific methods (e.g. findBySlug,
 * getNewUsersSince, etc).
 */
interface BaseRepositoryContract
{
    public function all(): Collection;

    public function paginate(int $perPage = 15): LengthAwarePaginator;

    public function find(int $id): ?Model;

    public function findOrFail(int $id): Model;

    public function create(array $attributes): Model;

    public function update(int $id, array $attributes): Model;

    public function delete(int $id): bool;
}
