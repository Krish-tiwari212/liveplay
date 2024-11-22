import React from 'react'

const page = () => {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <h1 className='text-2xl md:text-4xl font-semibold mb-8'>Cancellation Policy</h1>
      <p className='mb-2 font-medium text-base md:text-lg'>
        Organizers can cancel events at any time by using the event management
        utility provided on their dashboard. Upon event cancellation, a
        cancellation fee of 7.5% of net event sales will be levied and must be
        paid by the organizer to successfully cancel the event.
      </p>
      <p className='mb-10 font-medium text-base md:text-lg'>
        For Elite organizers, this fee is 5%. Failure to pay the cancellation
        fee will result in the event not being cancelled and players may
        approach the organizer or hold the organizer accountable if the event
        does not take place. In the case of non-performance (failure to conduct
        the event on the scheduled day without prior cancellation), a 7.5% fee
        will be levied and player refunds will be processed. If the organizer
        fails to pay the fee, the cancellation fee will be deducted from
        participants' registration fees. In such cases, the organizer will be
        debarred from hosting any future events on the platform, and strict
        action will be taken against them.
      </p>
    </div>
  );
}

export default page
