/**
 * @typedef {{
 *     timeout: number,
 *     loop: boolean,
 *     speed: number,
 *     speedVariation: number,
 *     errorQuota?: number,
 *     errorCharacterMap?: string,
 *     cursor?: string,
 * }} Options
 */

function writeAndDelete(documentOrSelector, list, options) {
    const cursorElement = document.createElement('span');
    cursorElement.innerText = options.cursor || '';
    cursorElement.style = `
    color: currentColor; 
    position: absolute; 
    width: 1ch;
    `;
    cursorElement.animate([
        { opacity: 0 },
        { opacity: 1 },
    ], {
        duration: options.cursorSpeed,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
    });

    /**
     * Write text
     * @param {Element} element
     * @param {string} text
     * @param {string} cursor
     * @return {function(): void}
     */
    const write = (element, text, { cursor }) => {
        element.innerText = text;
        cursorElement.innerText = cursor;
        element.appendChild(cursorElement);
    }

    /**
     * Schedule new text changes
     * @param {Element} element
     * @param {string} text
     * @param {Options} options
     * @return {Promise<void>}
     */
    const queueNewWriting = (element, text, options) => new Promise((resolve) => {
        const speed = options.speed * (options.speedVariation ? (Math.random() * options.speedVariation) : 1);
        setTimeout(() => {
            write(element, text, options);
            return resolve();
        }, speed)
    });

    /**
     * Get random character from map
     * @param {string} charMap
     * @return {string}
     */
    const getRandomCharacter = (charMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => {
        const chars = [...charMap];
        return [...Array(1)].map(i => chars[Math.random() * chars.length | 0]).join``;
    }

    /**
     *
     * @param {Element} element
     * @param {'write' | 'delete'} direction
     * @param {string} text
     * @param {Options} options
     */
    const textWriter = async (element, text, direction, options) => new Promise(async (resolve) => {
        const chars = text.split('');

        if (direction === 'write') {
            for (let i = 0; i <= chars.length; i++) {
                if (!!options.errorQuota && Math.random() <= options.errorQuota) {
                    const randomChar = getRandomCharacter(options.errorCharacterMap);
                    await queueNewWriting(element, text.substr(0, i - 1) + randomChar, options);
                    await queueNewWriting(element, text.substr(0, i - 1), options);
                }
                await queueNewWriting(element, text.substr(0, i), options);
            }
        }

        if (direction === 'delete') {
            write(element, text, options);
            for (let i = chars.length; i >= 0; i--) {
                await queueNewWriting(element, text.substr(0, i), options);
            }
        }

        return resolve();
    });

    /**
     * Text writer generator
     * @param {Element} container
     * @param {string[]} list
     * @param {Options} options
     * @return {Generator<function(): Promise<void>, void, *>}
     */
    function* writerGenerator(container, list, options) {
        for (let i = 0; i < list.length; i++) {
            yield () => textWriter(container, list[i], 'write', options);
            yield () => textWriter(container, list[i], 'delete', options);
        }
    }

    /**
     * Small pause utility
     * @param {number} t
     * @return {Promise<void>}
     */
    const wait = (t) => new Promise((resolve) => setTimeout(() => resolve(), t));

    /**
     * Main init function
     * @param {Element | string} documentOrSelector
     * @param {string[]} list
     * @param {Options} options
     */
    const init = async (documentOrSelector, list, options) => {
        const container = typeof documentOrSelector === 'string' ? document.querySelector(documentOrSelector) : documentOrSelector;
        for (let write of writerGenerator(container, list, options)) {
            await write();
            await wait(options.timeout)
        }

        if (options.loop) {
            return init(documentOrSelector, list, options);
        }
    }

    init(documentOrSelector, list, options);
}
