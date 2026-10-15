export function createClickCounter(name, maxClicks) {
    let count = 0;

    return {
        
        click() {
            if (count >= maxClicks) return false;
            count++;
            console.log(`[${name}] натискань: ${count}, залишилось: ${maxClicks - count}`);
            return true;
        },
        left() {
            return maxClicks - count;
        },
        reset() {
            count = 0;
        }
    };
}
