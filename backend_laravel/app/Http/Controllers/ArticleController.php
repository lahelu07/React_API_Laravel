<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        $pageSize = request()->query('pageSize', 5); // Default to 5 per page
        $articles = Article::paginate($pageSize);

        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $article = new Article();
        $article->title = $request->title;
        $article->author = $request->author;
        $article->content = $request->content;
        $article->email = $request->email;
        $article->save();
        return response()->json($article);
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->title = $request->title;
        $article->author = $request->author;
        $article->content = $request->content;
        $article->email = $request->email;
        $article->save();
        return response()->json($article);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json($article);
    }

    public function trash()
    {
        $articles = Article::onlyTrashed()->get();

        return response()->json($articles);
    }

    public function restore($id)
    {
        $article = Article::onlyTrashed()->findOrFail($id);
        $article->restore();
        return response()->json($article);
    }

    public function forceDelete($id)
    {
        $article = Article::onlyTrashed()->findOrFail($id);
        $article->forceDelete();
        return response()->json($article);
    }
}
