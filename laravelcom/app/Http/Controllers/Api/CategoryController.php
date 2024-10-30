<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Category::all());
    }
    public function show(Request $request, int $id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                'status' => 200,
                'data' => $category
            ], 200);
        }
        abort(400, $category);
    }
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'meta_title' => 'required|max:191',
                'slug' => 'required|max:191',
                'name' => 'required|max:191',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 400,
                    'message' => 'validation error',
                    'errors' => $validator->errors()
                ], 400);
            } else {
                $category = new Category();
                $category->slug = $request->input('slug');
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->status = $request->input('status') ? $request->input('status') : 0;
                $category->meta_title = $request->input('meta_title');
                $category->meta_description = $request->input('meta_description');
                $category->meta_keyword = $request->input('meta_keyword');
                if ($category->save()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Create Category successfully !',
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 400,
                        'message' => 'validation error',
                        'errors' => $validator->errors()
                    ], 400);
                }
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $ex->getMessage()
            ], status: 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'meta_title' => 'required|max:191',
                'slug' => 'required|max:191',
                'name' => 'required|max:191',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors()
                ], 422);
            } else {
                $category = Category::find($id);
                if (!$category) {
                    abort(422, $category);
                }

                $category->slug = $request->input('slug');
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->status = $request->input('status') ? $request->input('status') : 0;
                $category->meta_title = $request->input('meta_title');
                $category->meta_description = $request->input('meta_description');
                $category->meta_keyword = $request->input('meta_keyword');
                if ($category->save()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Update Category successfully !',
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 422,
                        'message' => 'validation error',
                        'errors' => $validator->errors()
                    ], 422);
                }
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $ex->getMessage()
            ], status: 500);
        }
    }
    public function delete($id)
    {
        try {
            $category = Category::find($id);
            if ($category) {
                $category->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Category Deleted Successfully'
                ]);
            }
            abort(404, $category);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $ex->getMessage()
            ], status: 500);
        }
    }
}
