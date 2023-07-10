export enum UdpEvents {
    CAR_INFO = "car_info",
    CAR_UPDATE = 'car_update',
    CHAT = 'chat',
    CLIENT_EVENT = 'client_event',
    CLIENT_LOADED = 'client_loaded',
    COLLISION_WITH_CAR = 'collision_with_car',
    COLLISION_WITH_ENV = 'collision_with_env',
    CONNECTION_CLOSED = 'connection_closed',
    END_SESSION = 'end_session',
    SERVER_ERROR = 'server_error',
    LAP_COMPLETED = 'lap_completed',
    NEW_CONNECTION = 'new_connection',
    NEW_SESSION = 'new_session',
    SESSION_INFO = 'session_info',
    VERSION = 'version',
    UNSUPPORTED_EVENT = "unsupported_event",
    UDP_CLOSE = "udp_close",
    UDP_ERROR = "udp_error",
    UDP_LISTENING = "udp_listening",
    UDP_MESSAGE = "udp_message",
}

export type TyreVec<T = number> = {
    fl: T;
    fr: T;
    rl: T;
    rr: T;
}

export type Vec3<T = number> = {
    x: T;
    y: T;
    z: T;
}


export enum EventTypes {
    PHYSICS_UPDATE = "physics_update",
    GRAPHICS_UPDATE = "graphics_update",
    STATIC_UPDATE = "static_update"
}

/**
 * All taken from AC Shared Memory reference: https://www.assettocorsa.net/forum/index.php?threads/shared-memory-reference-25-05-2017.3352/
 */
export interface SPageFileStatic {
    smVersion: string; // Version of the Shared Memory structure
    acVersion: string; // Version of Assetto Corsa
    numberOfSessions: number; // Number of sessions in this instance
    numCars: number; // Max number of possible cars on track
    carModel: string; // Name of the player’s car
    track: string; // Name of the track
    playerName: string; // Name of the player
    playerSurname: string; // Surname of the player
    playerNick: string; // Nickname of the player
    sectorCount: number; // Number of track sectors
    maxTorque: number; // Max torque value of the player’s car
    maxPower: number; // Max power value of the player’s car
    maxRpm: number; // Max rpm value of the player’s car
    maxFuel: number; // Max fuel value of the player’s car
    suspensionMaxTravel: TyreVec<number>; // Max travel distance of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    tyreRadius: TyreVec<number>; // Radius of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    maxTurboBoost: number; // Max turbo boost value of the player’s car
    deprecated1: number; // Do not use it
    deprecated2: number; // Do not use it
    penaltiesEnabled: boolean; // Cut penalties enabled: 1 (true) or 0 (false)
    aidFuelRate: number; // Fuel consumption rate: 0 (no cons), 1 (normal), 2 (double cons) etc.
    aidTireRate: number; // Tire wear rate: 0 (no wear), 1 (normal), 2 (double wear) etc.
    aidMechanicalDamage: number; // Damage rate: 0 (no damage) to 1 (normal)
    aidAllowTyreBlankets: boolean; // Player starts with hot (optimal temp) tyres: 1 (true) or 0 (false)
    aidStability: number; // Stability aid: 0 (no aid) to 1 (full aid)
    aidAutoClutch: boolean; // If player’s car has the “auto clutch” feature enabled : 0 or 1
    aidAutoBlip: boolean; // If player’s car has the “auto blip” feature enabled : 0 or 1
    hasDRS: boolean; // If player’s car have the “DRS” system: 0 or 1
    hasERS: boolean; // If player’s car has the “ERS” system: 0 or 1
    hasKERS: boolean; // If player’s car has the “KERS” system: 0 or 1
    kersMaxJ: number; // Max KERS Joule value of the player’s car
    engineBrakeSettingsCount: number; // Count of possible engine brake settings of the player’s car
    ersPowerControllerCount: number; // Count of the possible power controllers of the player’s car
    trackSplineLength: number; // Length of the spline of the selected track
    trackConfiguration: string; // Name of the track’s layout (only multi-layout tracks)
    ersMaxJ: number; // Max ERS Joule value of the player’s car
    isTimedRace: boolean; // 1 if the race is a timed one
    hasExtraLap: boolean; // 1 if the timed race is set with an extra lap
    carSkin: string; // Name of the used skin
    reversedGridPositions: number; // How many positions are going to be swapped in the second race
    pitWindowStart: number; // Pit window is open on Lap/Minute
    pitWindowEnd: number; // Pit window is closed on Lap/Minute
}

export interface SPageFilePhysics {
    packetId: number; // Index of the shared memory’s current step
    gas: number; // Value of gas pedal: 0 to 1 (fully pressed)
    brake: number; // Value of brake pedal: 0 to 1 (fully pressed)
    fuel: number; // Liters of fuel in the ca
    gear: number; // Selected gear (0 is reverse, 1 is neutral, 2 is first gear )
    rpms: number; // Value of rpm
    steerAngle: number; // Angle of steer
    speedKmh: number; // Speed in Km/h
    velocity: Vec3<number>; // Velocity for each axis (world related) [x, y, z]
    accG: Vec3<number>; // G-force for each axis (local related) [x, y, z]
    wheelSlip: TyreVec<number>; // Spin speed of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    wheelLoad: TyreVec<number>; // Load on each tyre (in N) [Front Left, Front Right, Rear Left, Rear Right]
    wheelPressure: TyreVec<number>; // Pressure of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    wheelAngularSpeed: TyreVec<number>; // Angular speed of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    tyreWear: TyreVec<number>; // Current wear of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    tyreDirtyLevel: TyreVec<number>; // Dirt level on each tyre [Front Left, Front Right, Rear Left, Rear Right]
    tyreCoreTemperature: TyreVec<number>; // Core temperature of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    camberRad: TyreVec<number>; // Camber of each tyre in Radian [Front Left, Front Right, Rear Left, Rear Right]
    suspensionTravel: TyreVec<number>; // Suspension travel for each tyre [Front Left, Front Right, Rear Left, Rear Right]
    drs: boolean; // If DRS is present and enabled: 0 (false) or 1 (true)
    tc: number; // Slip ratio limit for the traction control (if enabled)
    heading: number; // Heading of the car on world coordinates
    pitch: number; // Pitch of the car on world coordinates
    roll: number; // Roll of the car on world coordinates
    cgHeight: number; // Height of Center of Gravity
    carDamage: [number, number, number, number, number]; // Level of damage for each car section (only first 4 are valid)
    numberOfTyresout: number; // How many tyres are allowed to stay out of the track to not receive a penalty
    pitLimiterOn: boolean; // If pit limiter is enabled: 0 (false) or 1 (true)
    abs: number; // Slip ratio limit for the ABS (if enabled)
    kersCharge: number; // KERS/ERS battery charge: 0 to 1
    kersInput: number; // KERS/ERS input to engine: 0 to 1
    autoShifterOn: boolean; // If auto shifter is enabled: 0 (false) or 1 (true)
    rideHeight: { front: number; rear: number }; // Ride heights: front and rear
    turboBoost: number; // Turbo boost
    ballast: number; // Kilograms of ballast added to the car (only in multiplayer)
    airDensity: number; // Air density
    airTemp: number; // Ambient temperature
    roadTemp: number; // Road temperature
    localAngularVel: Vec3<number>; // Angular velocity of the car [x, y, z]
    finalFF: number; // Current Force Feedback value;
    performanceMeter: number; // Performance meter compared to the best lap
    engineBrake: number; // Engine brake setting
    ersRecoveryLevel: number; // ERS recovery level
    ersPowerLevel: number; // ERS selected power controller
    ersHeatCharging: "motor" | "battery"; // ERS changing: 0 (Motor) or 1 (Battery)
    ersIsCharging: boolean; // If ERS battery is recharging: 0 (false) or 1 (true)
    kersCurrentKJ: number; // KERS/ERS KiloJoule spent during the lap
    drsAvailable: boolean; // If DRS is available (DRS zone): 0 (false) or 1 (true)
    drsEnabled: boolean; // If DRS is enabled: 0 (false) or 1 (true)
    brakeTemp: TyreVec<number>; // Brake temp for each tire [Front Left, Front Right, Rear Left, Rear Right]
    clutch: number; // Value of clutch pedal: 0 to 1 (fully pressed)
    tyreTemp: TyreVec<number>; // Inner temperature of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    tyreTempM: TyreVec<number>; // Middle temperature of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    tyreTempO: TyreVec<number>; // Outer temperature of each tyre [Front Left, Front Right, Rear Left, Rear Right]
    isAiControlled: boolean; // AI controlled car: 0 (human) or 1 (AI)
    tyreContactPoint: TyreVec<Vec3<number>>; // Vector for contact point of each tyre [Front Left, Front Right, Rear Left, Rear Right][x, y, z]
    tyreContactNormal: TyreVec<Vec3<number>>; // Vector for contact normal of each tyre [Front Left, Front Right, Rear Left, Rear Right][x, y, z]
    tyreContactHeading: TyreVec<Vec3<number>>; // Vector for contact heading of each tyre [Front Left, Front Right, Rear Left, Rear Right][x, y, z]
    brakeBias: number; // Brake bias from 0 (rear) to 1 (front)
    localVelocity: Vec3<number>; // Vector for local velocity
}

export interface SPageFileGraphic {
    packetId: number; // Index of the shared memory’s current step
    status: number; // Status of the instance: AC_OFF 0, AC_REPLAY 1, AC_LIVE 2, AC_PAUSE 3
    session: number; // Session type:  AC_UNKNOWN -1, AC_PRACTICE 0, AC_QUALIFY 1, AC_RACE 2, AC_HOTLAP 3, AC_TIME_ATTACK 4, AC_DRIFT 5, AC_DRAG 6
    currentTime: string; // Current lap time
    lastTime: string; // Last lap time
    bestTime: string; // Best lap time
    split: string; // Time in sector
    completedLaps: number; // Number of completed laps by the player
    position: number; // Current player position (standings)
    iCurrentTime: number; // Current lap time
    iLastTime: number; // Last lap time
    iBestTime: number; // Best lap time
    sessionTimeLeft: number; // Time left until session is closed
    distanceTraveled: number; // Distance traveled during the instance
    isInPit: boolean; // If player’s car is stopped in the pit: 0 (false) or 1 (true)
    currentSectorIndex: number; // Current sector index
    lastSectorTime: number; // Last sector time
    numberOfLaps: number; // Number of laps needed to close the session
    typeCompound: string; // Current tyre compound
    replayTimeMultiplier: number; // Replay multiplier
    normalizedCarPosition: number; // Car position on the track’s spline
    carCoordinates: Vec3<number>; // Car position on world coordinates [x, y, z]
    penaltyTime: number; // Time of penalty
    flag: number; // Type of flag being shown: AC_NO_FLAG 0, AC_BLUE_FLAG 1, AC_YELLOW_FLAG 2, AC_BLACK_FLAG 3, AC_WHITE_FLAG 4, AC_CHECKERED_FLAG 5, AC_PENALTY_FLAG 6
    idealLineOn: boolean; // If ideal line is enabled: 0 (false) or 1 (true)
    isInPitlane: boolean; // If player’s car is in the pitlane: 0 (false) or 1 (true)
    surfaceGrip: number; // Current grip of the track’s surface
    mandatoryPitDone: boolean; // Set to 1 if the player has done the mandatory pit
    windSpeed: number; // Speed of the wind on the current session
    windDirection: number; // Direction of the wind (0-359) on the current session
}

export enum AC_STATUS {
    AC_OFF = 0,
    AC_REPLAY = 1,
    AC_LIVE = 2,
    AV_PAUSE = 3
}

export enum AC_SESSION_TYPE {
    AC_UNKNOWN = -1,
    AC_PRACTICE = 0,
    AC_QUALIFY = 1,
    AC_RACE = 2,
    AC_HOTLAP = 3,
    AC_TIME_ATTACK = 4,
    AC_DRIFT = 5,
    AC_DRAG = 6
}

export enum AC_FLAG_TYPE {
    AC_NO_FLAG = 0,
    AC_BLUE_FLAG = 1,
    AC_YELLOW_FLAG = 2,
    AC_BLACK_FLAG = 3,
    AC_WHITE_FLAG = 4,
    AC_CHECKERED_FLAG = 5,
    AC_PENALTY_FLAG = 6,
}