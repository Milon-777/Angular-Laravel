<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Http\Resources\ArticleResource;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Article::all();
        return ArticleResource::collection(Article::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Article::create($request->all());

        $response['status'] = 1;
        $response['code'] = 200;
        $response['message'] = 'Article was created successfully!';

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if(Article::where('id', $id)->exists()){

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Article was found successfully!';
            $response['data'] = new ArticleResource(Article::find($id));
    
            return response()->json($response, 200);
        } else {
            $response['status'] = 0;
            $response['code'] = 404;
            $response['message'] = 'Article was not found';
            $response['data'] = null;
    
            return response()->json($response,404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if(Article::where('id', $id)->exists()){
            $article = Article::find($id);
            $article->title = $request->title;
            $article->content = $request->content;
            $article->author = $request->author;

            $article->save();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Article was updated successfully!';
            $response['data'] = new ArticleResource(Article::find($id));
    
            return response()->json($response, 200);
        } else {
            $response['status'] = 0;
            $response['code'] = 404;
            $response['message'] = 'Article was not found!';
            $response['data'] = null;
    
            return response()->json($response, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Article::where('id',$id)->exists()){
            $article = Article::find($id);
            $article->delete();

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'Article was deleted successfully!';
    
            return response()->json($response, 200);
        } else {
            $response['status'] = 0;
            $response['code'] = 404;
            $response['message'] = 'Article was not found';

            return response()->json($response, 404);
        }
    }
}
