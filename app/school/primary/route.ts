import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

// This function redirects users from /school/primary to /school/primary/class-1
export function GET() {
  return NextResponse.redirect(new URL('/school/primary/class-1', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
} 