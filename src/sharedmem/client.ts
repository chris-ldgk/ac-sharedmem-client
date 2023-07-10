import { SmartBuffer } from 'smart-buffer'
import { readString, readStringW, readTyreVec, readTyreVec3, readVector3f } from '../utils/buf';
import NodeIPC from '@fynnix/node-easy-ipc';
import { TypedEventEmitter } from '../utils/events';
import { AC_FLAG_TYPE, AC_SESSION_TYPE, AC_STATUS, EventTypes, SPageFileGraphic, SPageFilePhysics, SPageFileStatic } from './types';

export type ACSharedMemClientEventTypes = {
    [EventTypes.PHYSICS_UPDATE]: [physicsInfo: SPageFilePhysics],
    [EventTypes.GRAPHICS_UPDATE]: [graphicsInfo: SPageFileGraphic],
    [EventTypes.STATIC_UPDATE]: [staticInfo: SPageFileStatic],
}

const PHYSICS_PAGEFILE = "Local\\acpmf_physics";
const PHYSICS_BUFFER_LENGTH = 1280;
const GRAPHICS_PAGEFILE = "Local\\acpmf_graphics"
const GRAPHICS_BUFFER_LENGTH = 1280;
const STATIC_PAGEFILE = "Local\\acpmf_static"
const STATIC_BUFFER_LENGTH = 1280;

export class ACSharedMemClient extends TypedEventEmitter<ACSharedMemClientEventTypes> {
    private _physicsMapping = new NodeIPC.FileMapping()
    private _physicsInterval: NodeJS.Timer | undefined;

    private _graphicsMapping = new NodeIPC.FileMapping()
    private _graphicsInterval: NodeJS.Timer | undefined;

    private _staticMapping = new NodeIPC.FileMapping()
    private _staticInterval: NodeJS.Timer | undefined;

    constructor() {
        super();
    }

    private onPhysicsUpdate = () => {
        const initialBuf = Buffer.alloc(PHYSICS_BUFFER_LENGTH);
        this._physicsMapping.createMapping(null, PHYSICS_PAGEFILE, PHYSICS_BUFFER_LENGTH);
        this._physicsMapping.readInto(0, PHYSICS_BUFFER_LENGTH, initialBuf);
        const buf = SmartBuffer.fromBuffer(initialBuf);

        const physicsResult: SPageFilePhysics = {
            packetId: buf.readUInt32LE(),
            gas: buf.readFloatLE(),
            brake: buf.readFloatLE(),
            fuel: buf.readFloatLE(),
            gear: buf.readUInt32LE() - 1,
            rpms: buf.readUInt32LE(),
            steerAngle: buf.readFloatLE(),
            speedKmh: buf.readFloatLE(),
            velocity: readVector3f(buf),
            accG: readVector3f(buf),
            wheelSlip: readTyreVec(buf),
            wheelLoad: readTyreVec(buf),
            wheelPressure: readTyreVec(buf),
            wheelAngularSpeed: readTyreVec(buf),
            tyreWear: readTyreVec(buf),
            tyreDirtyLevel: readTyreVec(buf),
            tyreCoreTemperature: readTyreVec(buf),
            camberRad: readTyreVec(buf),
            suspensionTravel: readTyreVec(buf),
            drs: buf.readFloatLE() === 1,
            tc: buf.readFloatLE(),
            heading: buf.readFloatLE(),
            pitch: buf.readFloatLE(),
            roll: buf.readFloatLE(),
            cgHeight: buf.readFloatLE(),
            carDamage: [buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE()],
            numberOfTyresout: buf.readUInt32LE(),
            pitLimiterOn: buf.readUInt32BE() === 1,
            abs: buf.readFloatLE(),
            kersCharge: buf.readFloatLE(),
            kersInput: buf.readFloatLE(),
            autoShifterOn: buf.readUInt32LE() === 1,
            rideHeight: { front: buf.readFloatLE(), rear: buf.readFloatLE() },
            turboBoost: buf.readFloatLE(),
            ballast: buf.readFloatLE(),
            airDensity: buf.readFloatLE(),
            airTemp: buf.readFloatLE(),
            roadTemp: buf.readFloatLE(),
            localAngularVel: readVector3f(buf),
            finalFF: buf.readFloatLE(),
            performanceMeter: buf.readFloatLE(),
            engineBrake: buf.readUInt32LE(),
            ersRecoveryLevel: buf.readUInt32LE(),
            ersPowerLevel: buf.readUInt32LE(),
            ersHeatCharging: buf.readUInt32LE() === 1 ? "battery" : "motor",
            ersIsCharging: buf.readUInt32LE() === 1,
            kersCurrentKJ: buf.readFloatLE(),
            drsAvailable: buf.readUInt32LE() === 1,
            drsEnabled: buf.readUInt32LE() === 1,
            brakeTemp: readTyreVec(buf),
            clutch: buf.readFloatLE(),
            tyreTemp: readTyreVec(buf),
            tyreTempM: readTyreVec(buf),
            tyreTempO: readTyreVec(buf),
            isAiControlled: buf.readUInt32LE() === 1,
            tyreContactPoint: readTyreVec3(buf),
            tyreContactNormal: readTyreVec3(buf),
            tyreContactHeading: readTyreVec3(buf),
            brakeBias: buf.readFloatLE(),
            localVelocity: readVector3f(buf)
        }

        return this.emit(EventTypes.PHYSICS_UPDATE, physicsResult)
    }

    private onGraphicsUpdate = () => {
        const initialBuf = Buffer.alloc(GRAPHICS_BUFFER_LENGTH);
        this._graphicsMapping.createMapping(null, GRAPHICS_PAGEFILE, GRAPHICS_BUFFER_LENGTH);
        this._graphicsMapping.readInto(0, GRAPHICS_BUFFER_LENGTH, initialBuf);
        const buf = SmartBuffer.fromBuffer(initialBuf);

        const graphicsResult: SPageFileGraphic = {
            packetId: buf.readUInt32LE(),
            status: buf.readUInt32LE(),
            session: buf.readUInt32LE(),
            currentTime: readStringW(buf, 15),
            lastTime: readStringW(buf, 15),
            bestTime: readStringW(buf, 15),
            split: readStringW(buf, 15),
            completedLaps: buf.readUInt32LE(),
            position: buf.readUInt32LE(),
            iCurrentTime: buf.readUInt32LE(),
            iLastTime: buf.readUInt32LE(),
            iBestTime: buf.readUInt32LE(),
            sessionTimeLeft: buf.readFloatLE(),
            distanceTraveled: buf.readFloatLE(),
            isInPit: buf.readUInt32LE() === 1,
            currentSectorIndex: buf.readUInt32LE(),
            lastSectorTime: buf.readUInt32LE(),
            numberOfLaps: buf.readUInt32LE(),
            typeCompound: readStringW(buf, 34),
            replayTimeMultiplier: buf.readFloatLE(),
            normalizedCarPosition: buf.readFloatLE(),
            carCoordinates: readVector3f(buf),
            penaltyTime: buf.readUInt32LE(),
            flag: buf.readUInt32LE(),
            idealLineOn: buf.readUInt32LE() === 1,
            isInPitlane: buf.readUInt32LE() === 1,
            surfaceGrip: buf.readFloatLE(),
            mandatoryPitDone: buf.readUInt32LE() === 1,
            windSpeed: buf.readFloatLE(),
            windDirection: buf.readFloatLE(),
        }

        return this.emit(EventTypes.GRAPHICS_UPDATE, graphicsResult)
    }

    private onStaticUpdate = () => {
        const initialBuf = Buffer.alloc(STATIC_BUFFER_LENGTH);
        this._graphicsMapping.createMapping(null, STATIC_PAGEFILE, STATIC_BUFFER_LENGTH);
        this._graphicsMapping.readInto(0, STATIC_BUFFER_LENGTH, initialBuf);
        const buf = SmartBuffer.fromBuffer(initialBuf);

        const staticResult: SPageFileStatic = {
            smVersion: readStringW(buf, 15),
            acVersion: readStringW(buf, 15),
            numberOfSessions: buf.readUInt32LE(),
            numCars: buf.readUInt32LE(),
            carModel: readStringW(buf, 33),
            track: readStringW(buf, 33),
            playerName: readStringW(buf, 33),
            playerSurname: readStringW(buf, 33),
            playerNick: readStringW(buf, 34), // THIS VALUE IS FUCKING 34 BYTES LONG NOT 33 WHY THE FUCK WOULD THEY DO THIS
            sectorCount: buf.readUInt32LE(),
            maxTorque: buf.readFloatLE(),
            maxPower: buf.readFloatLE(),
            maxRpm: buf.readUInt32LE(),
            maxFuel: buf.readFloatLE(),
            suspensionMaxTravel: readTyreVec(buf),
            tyreRadius: readTyreVec(buf),
            maxTurboBoost: buf.readFloatLE(),
            deprecated1: buf.readFloatLE(),
            deprecated2: buf.readFloatLE(),
            penaltiesEnabled: buf.readUInt32LE() === 1,
            aidFuelRate: buf.readFloatLE(),
            aidTireRate: buf.readFloatLE(),
            aidMechanicalDamage: buf.readFloatLE(),
            aidAllowTyreBlankets: buf.readUInt32LE() === 1,
            aidStability: buf.readFloatLE(),
            aidAutoClutch: buf.readUInt32LE() === 1,
            aidAutoBlip: buf.readUInt32LE() === 1,
            hasDRS: buf.readUInt32LE() === 1,
            hasERS: buf.readUInt32LE() === 1,
            hasKERS: buf.readUInt32LE() === 1,
            kersMaxJ: buf.readFloatLE(),
            engineBrakeSettingsCount: buf.readUInt32LE(),
            ersPowerControllerCount: buf.readUInt32LE(),
            trackSplineLength: buf.readFloatLE(),
            trackConfiguration: readStringW(buf, 33),
            ersMaxJ: buf.readFloatLE(),
            isTimedRace: buf.readUInt32LE() === 1,
            hasExtraLap: buf.readUInt32LE() === 1,
            carSkin: readStringW(buf, 33),
            reversedGridPositions: buf.readUInt32LE(),
            pitWindowStart: buf.readUInt32LE(),
            pitWindowEnd: buf.readUInt32LE(),
        }

        return this.emit(EventTypes.STATIC_UPDATE, staticResult)
    }

    public init = (physicsUpdateInterval: number, graphicsUpdateInterval: number, staticUpdateInterval: number) => {
        this.onPhysicsUpdate();
        this._physicsInterval = setInterval(this.onPhysicsUpdate, physicsUpdateInterval);

        this.onGraphicsUpdate();
        this._graphicsInterval = setInterval(this.onGraphicsUpdate, graphicsUpdateInterval);

        this.onStaticUpdate();
        this._staticInterval = setInterval(this.onStaticUpdate, staticUpdateInterval)
    }

    public destroy = () => {
        this._physicsMapping.closeMapping();
        clearInterval(this._physicsInterval);

        this._graphicsMapping.closeMapping();
        clearInterval(this._graphicsInterval);

        this._staticMapping.closeMapping();
        clearInterval(this._staticInterval);
    }
}
