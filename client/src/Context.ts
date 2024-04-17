
export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    receive_message: (data: any) => void;
}

export interface ClientToServerEvents {
  //  hello: () => void;
    send_message: (data: any) => void;
    send_move: (data: any) => void;
    join_room: (data: any) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}


