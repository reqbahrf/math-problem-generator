import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { Receiver } from '@upstash/qstash';

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

    console.log('QStash signature verification successful');

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: outdatedSessions, error: fetchError } = await supabase
      .from('math_problem_sessions')
      .select('id')
      .lt('created_at', sevenDaysAgo.toISOString());

    if (fetchError) {
      console.error('Error fetching outdated sessions:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch outdated sessions' },
        { status: 500 }
      );
    }

    const sessionIdsToDelete = outdatedSessions.map((session) => session.id);

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

    // Then delete records from math_problem_sessions
    const { error: sessionsError } = await supabase
      .from('math_problem_sessions')
      .delete()
      .lt('created_at', sevenDaysAgo.toISOString());

    if (sessionsError) {
      console.error('Error deleting outdated sessions:', sessionsError);
      return NextResponse.json(
        { error: 'Failed to delete outdated sessions' },
        { status: 500 }
      );
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
