<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BaseController extends Controller
{
    protected $baseUrl = 'uploads';
    public function __construct()
    {
        try {
            $className = get_called_class();
            if ($className === ProductController::class) {
                $this->baseUrl .= '/product';
            }


            // Tạo thư mục nếu chưa tồn tại
            if (!File::exists(public_path($this->baseUrl))) {
                File::makeDirectory(public_path($this->baseUrl), 0755, true);
            }
        } catch (Exception $ex) {
            return $ex->getMessage();
        }
    }
    public function uploadFile($files)
    {
        try {
            if (!empty($files)) {
                // return $files;
                $imageList = [];
                foreach ($files as $file) {
                    
                    // $extension = $file->getClientOriginalExtension();
                    $fileName =  $file->getClientOriginalName();
                    // $fileName = time() . '.' . $extension;
                    $file->move($this->baseUrl . '/', $fileName);
                    $imageList[] =   $fileName;
                }
                return $imageList;
            }
        } catch (HttpException $ex) {
            return response()->json(
                [
                    'status' => 500,
                    'error' => $ex->getMessage()
                ]
            );
        }
    }
    public function removeImage($listRemove = [])
    {
        try {
            if (empty($listRemove)) {
                abort(404, "Missing Image");
            } else if (!is_array($listRemove)) {
                abort(422, 'Images List not array  ');
            }
            foreach ($listRemove as $image) {
                $path = $this->baseUrl . '/' . $image;
                if (File::exists($path)) {
                    File::delete($path);
                }
            }
            return true;
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage()
            ], 500);
        }
    }
    public function showMessage($number)
    {
        return $number;
    }
}
