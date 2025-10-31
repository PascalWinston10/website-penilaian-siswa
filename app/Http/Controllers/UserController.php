<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules as PasswordRules;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Menampilkan daftar semua pengguna.
     */
    public function index(Request $request)
    {
        $filters = $request->only('role');
        $query = User::orderBy('name');

        if ($request->filled('role') && in_array($request->role, ['guru', 'siswa'])) {
            $query->where('role', $request->role);
        }

        $users = $query->paginate(15)
            ->withQueryString()
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $filters,
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'role' => ['required', Rule::in(['guru', 'siswa'])],
            'password' => ['required', 'confirmed', PasswordRules\Password::defaults()],
        ]);

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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'role' => ['required', Rule::in(['guru', 'siswa'])],
            'password' => ['nullable', 'confirmed', PasswordRules\Password::defaults()],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

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
        if ($user->id === auth()->id()) {
            return Redirect::route('users.index')->with('error', 'Anda tidak bisa menghapus akun Anda sendiri.');
        }

        $user->delete();

        return Redirect::route('users.index')->with('success', 'Pengguna berhasil dihapus.');
    }
}