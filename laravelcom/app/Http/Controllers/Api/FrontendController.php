<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class FrontendController extends Controller
{
    public function category()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
    public function product($slug = "")
    {
        try {
            if (empty($slug)) {
                abort(422, "missing slug");
            }
            // get category 
            $category = Category::where('slug', $slug)->first();
            if ($category) {
                // get all product
                $products = Product::where('category_id', $category->id)->get();
                if (count($products) >= 0) {
                    return response()->json([
                        'status' => 200,
                        'products' => $products,
                        'category' => $category
                    ]);
                }
                abort(422, $products);
            }
            abort(422, $category);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ]);
        }
    }
    public function productDetails($category_slug = "", $product_slug = "")
    {
        try {
            if (empty($category_slug) || empty($product_slug)) {
                return response()->json([
                    'status' => 422,
                    'errors' => 'missing data'
                ]);
            }
            $category = Category::where('slug', $category_slug)->first();
            if ($category) {
                $product = Product::where('category_id', $category->id)->where('slug', $product_slug)->first();;
                if ($product) {
                    return response()->json([
                        'status' => 200,
                        'products' => $product,
                    ]);
                }
                abort(404, "Product not found");
            }
            abort(404, 'Category not found');
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ]);
        }
    }
}
