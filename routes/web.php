<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiswaController;
use Inertia\Inertia;
use Illuminate\Http\Request;          // <-- Pastikan ini ada
use Illuminate\Support\Facades\Auth;       // <-- Pastikan ini ada
use Illuminate\Support\Facades\Redirect;   // <-- Pastikan ini ada

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Halaman Welcome (Publik)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// --- GRUP UNTUK SEMUA PENGGUNA (SISWA & GURU) ---
Route::middleware(['auth', 'verified'])->group(function () {
    
    // ** INI "PENJAGA PINTU" YANG HILANG **
    Route::get('/dashboard', function (Request $request) {
        if ($request->user()->role === 'guru') {
            // Jika guru, lempar ke halaman admin (CRUD Siswa)
            return Redirect::route('siswa.index');
        } else {
            // Jika bukan guru (default 'siswa'), lempar ke dashboard siswa
            return Redirect::route('dashboard.siswa');
        }
    })->name('dashboard'); // <-- Ini 'HOME' default Laravel

    // ** INI RUTE BARU YANG HILANG **
    // Halaman Dashboard Siswa yang baru
    Route::get('/dashboard-siswa', function () {
        return Inertia::render('DashboardSiswa');
    })->name('dashboard.siswa');

    // Halaman Profile (bisa diakses guru & siswa)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- GRUP KHUSUS GURU (ADMIN PANEL) ---
// ** INI STRUKTUR YANG BENAR **
// Terpisah dari grup 'auth' utama
Route::middleware(['auth', 'verified', 'guru'])->group(function () {
    Route::get('/siswa', [SiswaController::class, 'index'])->name('siswa.index');
    Route::get('/siswa/create', [SiswaController::class, 'create'])->name('siswa.create');
    Route::post('/siswa', [SiswaController::class, 'store'])->name('siswa.store');
    Route::get('/siswa/{siswa}/edit', [SiswaController::class, 'edit'])->name('siswa.edit');
    Route::put('/siswa/{siswa}', [SiswaController::class, 'update'])->name('siswa.update');
    Route::delete('/siswa/{siswa}', [SiswaController::class, 'destroy'])->name('siswa.destroy');
});

require __DIR__.'/auth.php';