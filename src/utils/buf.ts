import { SmartBuffer } from "smart-buffer";
import { TyreVec, Vec3 } from "../sharedmem";


export function readString(buf: SmartBuffer) {
    const length = buf.readUInt8();
    return buf.readString(length);
}

export function readStringW(buf: SmartBuffer, len: number) {
    const message = buf.readString(len * 2, 'utf16le')
    return message.replace(/\u0000/gi, "");
}

export function readVector3f(buf: SmartBuffer): Vec3 {
    return {
        x: buf.readFloatLE(),
        y: buf.readFloatLE(),
        z: buf.readFloatLE()
    }
}

export function readTyreVec(buf: SmartBuffer): TyreVec {
    return {
        fl: buf.readFloatLE(),
        fr: buf.readFloatLE(),
        rl: buf.readFloatLE(),
        rr: buf.readFloatLE(),
    }
}

export function readTyreVec3(buf: SmartBuffer): TyreVec<Vec3> {
    const tVec: TyreVec<Vec3> = { fl: { x: 0, y: 0, z: 0 }, fr: { x: 0, y: 0, z: 0 }, rl: { x: 0, y: 0, z: 0 }, rr: { x: 0, y: 0, z: 0 } }
    for (let i = 0; i < 4; i++) {
        const vec: Vec3 = { x: 0, y: 0, z: 0 };
        for (let j = 0; j < 3; j++)
            if (j === 0) {
                vec.x = buf.readFloatLE();
            } else if (j === 1) {
                vec.y = buf.readFloatLE();
            } else if (j === 2) {
                vec.z = buf.readFloatLE();
            }

        if (i === 0) {
            tVec.fl = vec;
        } else if (i === 1) {
            tVec.fr = vec;
        } else if (i === 2) {
            tVec.rl = vec;
        } else if (i === 3) {
            tVec.rr = vec;
        }
    }
    return tVec;
}

export function writeStringW(input: string) {
    const str = input.substring(0, 255);
    const converted = str.split('').join('\u0000') + '\u0000';

    const buf = SmartBuffer.fromSize(str.length * 4 + 1);
    buf.writeUInt8(str.length, 0);
    buf.writeString(converted, 1, 'utf16le')

    return buf.toBuffer();
}