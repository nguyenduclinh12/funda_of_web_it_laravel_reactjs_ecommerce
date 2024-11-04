<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ProductController extends BaseController
{
    public function index(Request $request)
    {
        $products = Product::all();
        return response()->json($products);
    }
    public function show(Request $request, int $id)
    {
        $product = Product::find($id);

        if ($product) {
            return response()->json([
                'status' => 200,
                'data' => $product
            ], 200);
        }
        return response()->json([
            'status' => 404,
            'message' => "Product not found"
        ], 404);
    }
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'category_id' => 'required|max:191',
                'slug' => 'required|max:191',
                'name' => 'required|max:191',
                'meta_title' => 'required|max:191',
                'brand' => 'required|max:20',
                'sale_price' => 'required|max:20',
                'cost_price' => 'required|max:20',
                'qty' => 'required|max:4',
                'image' => 'required|max:2048',
                'image.*' => 'max:2048',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors()
                ], 422);
            } else {
                $product = new Product();
                $product->category_id = $request->input('category_id');
                $product->slug = $request->input('slug');
                $product->name = $request->input('name');
                $product->description = $request->input('description');
                $product->meta_title = $request->input('meta_title');
                $product->meta_keyword = $request->input('meta_keyword');
                $product->meta_description = $request->input('meta_description');
                $product->brand = $request->input('brand');
                $product->sale_price = $request->input('sale_price');
                $product->cost_price = $request->input('cost_price');
                $product->qty = $request->input('qty');
                $product->status = $request->input('status') !== false ? 1 : 0;
                $product->popular = $request->input('popular') !== false ? 1 : 0;
                $product->featured = $request->input('featured') !== false ? 1 : 0;

                if ($request->hasFile('image')) {
                    // upload image
                    $files = $request->file('image');
                    $imageList = $this->uploadFile($files);
                    if (!is_array($imageList)) {
                        abort(422, $imageList);
                    }
                    $product->image = json_encode($imageList);
                }
                if ($product->save()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Create Product successfully !',
                    ], 200);
                } else {
                    return response()->json([
                        'status' => 400,
                        'errors' => $validator->errors()
                    ], 400);
                }
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'errors' => $ex->getMessage()
            ], status: 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'category_id' => 'required|max:191',
                'slug' => 'required|max:191',
                'name' => 'required|max:191',
                'meta_title' => 'required|max:191',
                'brand' => 'required|max:20',
                'sale_price' => 'required|max:20',
                'cost_price' => 'required|max:20',
                'qty' => 'required|max:4',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors()
                ], 422);
            } else {
                $product  = Product::find($id);
                if ($product) {
                    $product->category_id = $request->input('category_id');
                    $product->slug = $request->input('slug');
                    $product->name = $request->input('name');
                    $product->description = $request->input('description');
                    $product->meta_title = $request->input('meta_title');
                    $product->meta_keyword = $request->input('meta_keyword');
                    $product->meta_description = $request->input('meta_description');
                    $product->brand = $request->input('brand');
                    $product->sale_price = $request->input('sale_price');
                    $product->cost_price = $request->input('cost_price');
                    $product->qty = $request->input('qty');
                    $product->status = ($request->input('status') !== "false" && $request->input('status') !== "0") ? 1 : 0;
                    $product->popular = ($request->input('popular') !== "false" && $request->input('popular') !== "0") ? 1 : 0;
                    $product->featured = ($request->input('featured') !== "false" && $request->input('featured') !== "0") ? 1 : 0;
                    // return $product;

                    if ($request->hasFile('image')) {
                        //remove image
                        $resultRemove = $this->removeImage(json_decode($product->image));

                        if (!$resultRemove) {
                            abort(422, $resultRemove);
                        }
                        // upload image
                        $files = $request->file('image');
                        $imageList = $this->uploadFile($files);
                        // return $imageList;
                        if (!is_array($imageList)) {
                            abort(422, $imageList);
                        }
                        $product->image = json_encode($imageList);
                    }
                    if ($product->save()) {
                        return response()->json([
                            'status' => 200,
                            'message' => 'Update Product successfully !',
                        ], 200);
                    } else {
                        return response()->json([
                            'status' => 422,
                            'errors' => $validator->errors()
                        ], 422);
                    }
                } else {
                    return response()->json([
                        'status' => 404,
                        'errors' => "Product Not Found"
                    ], 404);
                }
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'errors' => $ex->getMessage()
            ]);
        }
    }
    public function delete($id)
    {
        try {
            $Product = Product::find($id);
            if ($Product) {
                $Product->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Product Deleted Successfully'
                ]);
            }
            abort(404, $Product);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $ex->getMessage()
            ], status: 500);
        }
    }
}
