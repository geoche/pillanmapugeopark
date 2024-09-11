import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {NextResponse} from "next/server";

let headers = {'accept-language': 'en-US,en;q=0.5'}
let languages = new Negotiator({headers}).languages()
let locales = ['en', 'es']
let defaultLocale = 'en'

match(languages, locales, defaultLocale) // -> 'en-US'


export function middleware(request) {
    // Check if there is any supported locale in the pathname
    const {pathname} = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = match(languages, locales, defaultLocale)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|favicon.ico|assets).*)',
        '/([\\w-]+)?/admin-panel/(.+)'
        // Optional: only run on root (/) URL
        // '/'
    ],
}