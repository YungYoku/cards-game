export class EarnBlock {
    constructor(className, blockId) {
        this.className = className;
        this.blockId = blockId;

        // this.onInit();
    }

    onInit() {
        window.yaContextCb.push(() => {
            window.Ya.Context.AdvManager.render({
                renderTo: this.className,
                blockId: this.blockId
            });
        });
    }
}
