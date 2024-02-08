import { createContext } from 'react';
import { EventEmitter } from '../events/EventEmiter';

export const EventsContext = createContext<EventEmitter<unknown> | null>(null);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const eventEmitter = new EventEmitter();

  return (
    <EventsContext.Provider value={eventEmitter}>
      {children}
    </EventsContext.Provider>
  );
};
