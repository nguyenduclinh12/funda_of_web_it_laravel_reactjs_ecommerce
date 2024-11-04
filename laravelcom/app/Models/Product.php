<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'meta_title',
        'meta_keyword',
        'meta_description',
        'slug',
        'name',
        'description',
        'brand',
        'sale_price',
        'cost_price',
        'qty',
        'featured',
        'popular',
        'status',
        'image'
    ];
    // phải có dòng này thì mới trả về kèm category cho reactjs
    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    // public function order(){
    //     return $this->belongsToMany(Order::class);
    // }
}
