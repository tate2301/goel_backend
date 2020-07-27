import {io} from '../socket';
import {Namespace} from "socket.io";

export function adminSyncNamespace(): Namespace {
  return io.of('/dash');
}

export function mobileSyncNamespace(): Namespace {
  return io.of('/mobile');
}