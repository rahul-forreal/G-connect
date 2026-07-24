export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sample<T>(arr: T[]): T {
    if (arr.length === 0) {
        throw new Error("Cannot sample from an empty array");
    }

    return arr[randomInt(0, arr.length - 1)]!;
}

export function sampleMany<T>(arr: T[], count: number): T[] {
    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = randomInt(0, i);

        const temp = copy[i]!;
        copy[i] = copy[j]!;
        copy[j] = temp;
    }

    return copy.slice(0, count);
}