import writeAndDelete from '../lib';

class WriteAndDeleteComponent extends HTMLElement {
    connectedCallback() {
        const list = this.innerText.split(',');
        this.innerText = '';
        const timeout = this.attributes.timeout ? parseInt(this.attributes.timeout.value) : 1000;
        const loop = this.attributes.loop ? this.attributes.loop.value === 'false' : true;
        const speed = this.attributes.speed ? parseInt(this.attributes.speed.value) : 300;
        const speedVariation = this.attributes.speedVariation ? parseFloat(this.attributes.speedVariation.value) : undefined;
        const errorQuota = this.attributes.errorQuota ? parseFloat(this.attributes.errorQuota.value) : 0;
        const errorCharacterMap = this.attributes.errorCharacterMap ? this.attributes.errorCharacterMap.value : undefined;
        const cursor = this.attributes.cursor ? this.attributes.cursor.value : '_';
        const cursorSpeed = this.attributes.cursorSpeed ? parseInt(this.attributes.cursorSpeed.value) : undefined;

        writeAndDelete(this, list.map(item => item.trim()), {
            speed,
            timeout,
            loop,
            speedVariation,
            errorQuota,
            errorCharacterMap,
            cursor,
            cursorSpeed,
        });
    }
}

window.customElements.define('write-and-delete', WriteAndDeleteComponent);

