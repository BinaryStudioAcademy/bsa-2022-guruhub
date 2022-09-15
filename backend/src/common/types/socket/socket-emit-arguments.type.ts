import { ServerToClientEvents } from './socket';

type EventToEmit = keyof ServerToClientEvents;

type EventToEmitArguments = Parameters<ServerToClientEvents[EventToEmit]>;

type SocketEmitArguments = {
  event: EventToEmit;
  args: EventToEmitArguments[0];
  roomId: string;
};

export { type SocketEmitArguments };
