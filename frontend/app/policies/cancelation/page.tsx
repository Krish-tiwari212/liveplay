import React from 'react'

const page = () => {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8">
        Cancellation Policy
      </h1>
      <p className="mb-4 text-base md:text-lg">
        Organizers may cancel an event at any time by accessing the event
        management panel in their organizer dashboard, selecting the "Cancel
        Event" option and paying the applicable cancellation fee. The
        cancellation fee is mandatory for all event cancellations where player
        registrations have taken place. In cases where no player registrations
        have occurred, organizers may cancel the event without any fee.
      </p>
      <p className="mb-4 text-base md:text-lg">
        The cancellation fee will be calculated on the "net event sales," which
        is defined as the gross registration fee for the event, less any
        discounts or refunds issued. The cancellation fee for standard
        organizers is 7.5% of net event sales, while for Elite organizers, it is
        5%.
      </p>
      <p className="mb-4 text-base md:text-lg">
        Failure to pay the cancellation fee will result in the inability to
        cancel the event. If an organizer attempts to cancel without fee
        payment, the event will remain active, and participants may hold the
        organizer accountable if the event does not take place.
      </p>
      <p className="mb-4 text-base md:text-lg">
        In the case of non-performance—where an event is not conducted on the
        scheduled date without proper cancellation—a cancellation fee of 7.5%
        will be imposed, and player refunds will be processed. Should the
        organizer fail to pay this cancellation fee, the fee will be deducted
        from the participant's registration fees. In such situations, the
        organizer will be debarred from hosting any future events on the
        platform, and strict action will be taken.
      </p>
      <p className="mb-10 text-base md:text-lg">
        For events canceled by organizers, participant refunds will be initiated
        and processed within 5-7 working days from the date of
        event cancellation.
      </p>
    </div>
  );
}

export default page
