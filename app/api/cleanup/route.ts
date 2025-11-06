import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { Receiver } from '@upstash/qstash';
import { sevenDaysAgo, oneYearAgo } from '@/lib/dateUtil';

export async function POST(request: Request) {
  try {
    if (
      !process.env.QSTASH_CURRENT_SIGNING_KEY ||
      !process.env.QSTASH_NEXT_SIGNING_KEY
    ) {
      throw new Error('Missing QStash signing keys environment variables');
    }

    const receiver = new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
    });

    const signature = request.headers.get('Upstash-Signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 401 }
      );
    }

    const body = await request.text(); // Get raw body for verification

    const isValid = await receiver.verify({
      signature,
      body,
    });

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const { data: sevenDaysOutdatedSessions, error: fetchError } =
      await supabase
        .from('math_problem_sessions')
        .select('id')
        .is('is_answered', true)
        .lt('created_at', sevenDaysAgo.toISOString());

    const { data: oneYearOldSessions, error: fetchOneYearError } =
      await supabase
        .from('math_problem_sessions')
        .select('id')
        .lt('created_at', oneYearAgo.toISOString());

    if (fetchError || fetchOneYearError) {
      console.error('Error fetching outdated sessions:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch outdated sessions' },
        { status: 500 }
      );
    }

    const sessionIdsToDelete = [
      ...sevenDaysOutdatedSessions.map((session) => session.id),
      ...oneYearOldSessions.map((session) => session.id),
    ];

    if (sessionIdsToDelete.length > 0) {
      const { error: submissionsError } = await supabase
        .from('math_problem_submissions')
        .delete()
        .in('session_id', sessionIdsToDelete);

      if (submissionsError) {
        console.error('Error deleting outdated submissions:', submissionsError);
        return NextResponse.json(
          { error: 'Failed to delete outdated submissions' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Outdated records cleaned successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cleanup function failed:', error);
    return NextResponse.json(
      { error: 'Cleanup function failed' },
      { status: 500 }
    );
  }
}
