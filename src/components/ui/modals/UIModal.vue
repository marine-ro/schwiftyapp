<template>
    <div
        class="modal modal__mask active"
        role="dialog"
        tabindex="1"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
        aria-modal="true"
        v-if="isShown"
        @click="close"
        @keyEvent.esc="keyEvent($event)"
        @keyup.esc="keyEvent($event)"

    >
        <div :class="'modal__content modal__content--' + internalSize" @click.stop>
            <span
                class="modal__close close"
                role="button"
                @click.stop.prevent="close"
                tabindex="0"
            />
            <div class="modal__header">
                <div
                    id="modal-title"
                    tabindex='0'
                    class="modal__title title"
                    v-if="title"
                >
                    {{ title }}
                </div>
            </div>
            <div id="modal-body" class="modal__body">
                <slot name="modal-body">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis, nisi.</slot>
            </div>
            <div class="modal__footer" v-if="hasFooter">
                <slot name="modal-footer">Lorem ipsum dolor sit amet.</slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: String,
                default: 'big',
                validator(value) {
                    return ['big', 'small'].indexOf(value) !== -1;
                },
            },
            title: {
                type: String,
                required: false,
            },
            hasFooter: {
                type: Boolean,
                default: false,
                required: false,
            },
        },
        data() {
            return {
                internalSize: 'big',
                allowSizes: [
                    'small',
                    'big',
                ],
                isShown: false,
            };
        },
        created() {
            if (this.allowSizes.indexOf(this.size) !== -1) {
                this.internalSize = this.size;
            }
        },
        methods: {
            close() {
                this.isShown = false;
                document.body.classList.remove('hidden');
                document.body.setAttribute('aria-hidden', 'false');

                //this.$emit('close');
            },
            show() {
                this.isShown = true;
                document.body.classList.add('hidden');
                document.body.setAttribute('aria-hidden', 'true');
                document.body.setAttribute('tabindex', '-1');
                this.$nextTick(() => {
                    document.getElementById('modal-title').focus();
                });

                //this.$emit('show');
            },
            keyEvent() {
                this.close();
            },
        },
    };
</script>
