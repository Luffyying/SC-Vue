export default {
    bind() {
    	console.log(this)
            this.attr = this.node.nodeType === 3 ? 'data' : 'textContent';
    },

    update(value) {
    	debugger
        this.node[this.attr] = value;
    }
}
