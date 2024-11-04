<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'zipCode',
        'payment_id',
        'payment_mode',
        'tracking_no',
        'status',
        'remark',
    ];

    public function orderItems(){
        return $this->hasMany(Orderline::class, 'order_id','id');
    }
}
