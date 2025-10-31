<?php

namespace App\Http\Controllers;

use App\Models\User; // <-- Model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash; // <-- Untuk Hashing Password
use Illuminate\Validation\Rule; // <-- Untuk Validasi
use Illuminate\Validation\Rules as PasswordRules; // <-- Aturan Password
use Inertia\Inertia; // <-- Tentu saja Inertia

class UserController extends Controller
{
    /**
     * Menampilkan daftar semua pengguna.
     */
    public function index(Request $request) // <-- Tambahkan Request $request
    {
        // 1. Ambil filter dari request (jika ada)
        $filters = $request->only('role');

        // 2. Mulai kueri
        $query = User::orderBy('name');

        // 3. Terapkan filter jika ada
        if ($request->filled('role') && in_array($request->role, ['guru', 'siswa'])) {
            $query->where('role', $request->role);
        }

        // 4. Ambil hasil (yang sudah difilter) dan lakukan paginasi
        $users = $query->paginate(15)
            ->withQueryString() // <-- PENTING: agar paginasi tetap membawa filter
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]);

        // 5. Kirim data pengguna DAN filter aktif ke frontend
        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $filters, // <-- Kirim filter yang sedang aktif
        ]);
    }
    /**
     * Menampilkan form untuk membuat pengguna baru.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Menyimpan pengguna baru ke database.
     */
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'role' => ['required', Rule::in(['guru', 'siswa'])],
            'password' => ['required', 'confirmed', PasswordRules\Password::defaults()],
        ]);

        // Buat pengguna baru
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        return Redirect::route('users.index')->with('success', 'Pengguna berhasil dibuat.');
    }

    /**
     * Menampilkan form untuk mengedit pengguna.
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ]);
    }

    /**
     * Mengupdate data pengguna di database.
     */
    public function update(Request $request, User $user)
    {
        // Validasi
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'role' => ['required', Rule::in(['guru', 'siswa'])],
            'password' => ['nullable', 'confirmed', PasswordRules\Password::defaults()], // Password boleh kosong (tidak diubah)
        ]);

        // Update data dasar
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        // Jika password diisi, update password
        if ($request->filled('password')) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return Redirect::route('users.index')->with('success', 'Pengguna berhasil diupdate.');
    }

    /**
     * Menghapus pengguna dari database.
     */
    public function destroy(User $user)
    {
        // Tambahan: Jangan biarkan pengguna menghapus akunnya sendiri
        if ($user->id === auth()->id()) {
            return Redirect::route('users.index')->with('error', 'Anda tidak bisa menghapus akun Anda sendiri.');
        }

        $user->delete();

        return Redirect::route('users.index')->with('success', 'Pengguna berhasil dihapus.');
    }
}