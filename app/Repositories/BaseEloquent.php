<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * BaseEloquent
 *
 * Shared CRUD implementation. Module-specific *Eloquent classes
 * (e.g. UserEloquent, DesignEloquent) extend this and only need to
 * set $this->model and add their own query methods.
 */
abstract class BaseEloquent implements BaseRepositoryContract
{
    protected Model $model;

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->paginate($perPage);
    }

    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    public function findOrFail(int $id): Model
    {
        $record = $this->find($id);

        if (!$record) {
            throw new NotFoundException(class_basename($this->model) . ' not found.');
        }

        return $record;
    }

    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    public function update(int $id, array $attributes): Model
    {
        $record = $this->findOrFail($id);
        $record->update($attributes);

        return $record->refresh();
    }

    public function delete(int $id): bool
    {
        $record = $this->findOrFail($id);

        return (bool) $record->delete();
    }
}
