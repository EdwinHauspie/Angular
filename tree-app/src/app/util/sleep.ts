/**
 * An awaitable timeout function.
 * @param delay Delay in milliseconds
 * @param onWake Optional callback
 * @example await sleep(1000);
 * @example sleep(1000, () => doStuffAfterOneSecond());
 */

export default function sleep(delay: number, onWake: Function = () => { }) {
    return new Promise(resolve => setTimeout(() => {
        onWake();
        resolve(true);
    }, delay));
}