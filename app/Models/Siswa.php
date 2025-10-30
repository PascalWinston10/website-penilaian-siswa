<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    /**
     * Kolom yang boleh diisi secara massal (mass assignable).
     */
    protected $fillable = [
        'nama_lengkap',
        'nis',
        'kelas',
    ];
}