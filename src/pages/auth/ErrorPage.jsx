import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="text-gray-700 mt-2">We couldn't find the page you were looking for.</p>
      {error?.statusText || error?.message ? (
        <p className="mt-2 text-sm text-gray-500">{error.statusText || error.message}</p>
      ) : null}
    </div>
  );
}
