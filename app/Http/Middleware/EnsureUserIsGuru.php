<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsGuru
{
    public function handle(Request $request, Closure $next): Response
    {
        // Periksa apakah pengguna sudah login DAN rolenya adalah 'guru'
        if ($request->user() && $request->user()->role === 'guru') {
            // Jika ya, izinkan lanjut
            return $next($request);
        }

        // Jika tidak, larang akses (Error 403: Forbidden)
        abort(403, 'ANDA TIDAK MEMILIKI WEWENANG.');
    }
}