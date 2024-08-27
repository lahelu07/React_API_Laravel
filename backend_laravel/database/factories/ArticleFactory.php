<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{

    protected $model = \App\Models\Article::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    public function definition(): array
    {
        return [
            'title' => fake()->text(20),
            'author' => fake()->text(20),
            'content' => fake()->text(50),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
