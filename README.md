# AC Shared Memory client

A strongly typed shared memory client for Assetto Corsa.

## Getting Started

```sh
npm install ac-sharedmem-client
```

## Usage

```ts
import { ACSharedMemClient, EventTypes } from "ac-sharedmem-client";

// Create new client instance
const client = new ACSharedMemClient();

// Listen to physics updates
client.on(EventTypes.PHYSICS_UPDATE, (physicsInfo) => console.log(physicsInfo));

// Listen to graphics updates
client.on(EventTypes.GRAPHICS_UPDATE, (graphicsInfo) =>
  console.log(graphicsInfo)
);

// Listen to static updates
client.on(EventTypes.STATIC_UPDATE, (staticInfo) => console.log(staticInfo));

// Initialize client (arg1 = Physics polling rate, arg2 = graphics polling rate, arg3 = static polling rate)
client.init(1000, 1000, 1000);

// Destroy client and including setIntervals and memory mappings
// client.destroy();
```
