<template>
    <uiModal
        ref="modal"
        size="small"
        :title="getTitle()"
        :hasFooter="hasFooter"
        @close="close"
    >
        <template #modal-body>{{ message }}</template>
        <template #modal-footer v-if="hasFooter">
            <uiButtonsGroup>
                <uiButton
                    type="submit"
                    kind="accent"
                    @click.prevent="confirm">
                    <template #btn-text>
                        {{ okButtonText }}
                    </template>
                </uiButton>
                <uiButton
                    type="reset"
                    kind="basic"
                    @click.prevent="close">
                    <template #btn-text>
                        {{ cancelButtonText }}
                    </template>
                </uiButton>
            </uiButtonsGroup>

        </template>
    </uiModal>
</template>

<script>
    import uiModal from '@/components/ui/modals/UIModal';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';
    import uiButton from '@/components/ui/btn/UIButton';

    export default {
        data() {
            return {
                title: '',
                message: '',
                okButtonText: '',
                cancelButtonText: 'cancel',
                resolvePromise: null,
                rejectPromise: null,

                hasFooter: true,
            };
        },
        components: {
            uiModal,
            uiButtonsGroup,
            uiButton,
        },
        created() {

        },
        methods: {
            getTitle() {
                return this.title ? this.title : 'Сonfirm action';
            },
            show(opts = {}) {
                this.title = opts.title;
                this.message = opts.message;
                this.okButtonText = opts.okButtonText;
                if (opts.cancelButtonText) {
                    this.cancelButtonText = opts.cancelButtonText;
                }
                this.$nextTick(() => {
                    this.$refs.modal.show();
                });

                return new Promise((resolve, reject) => {
                    this.resolvePromise = resolve;
                    this.rejectPromise = reject;
                });
            },

            confirm() {
                this.hide();
                this.resolvePromise(true);
            },

            close() {
                this.hide();
                this.rejectPromise();
            },
            hide() {
                this.$nextTick(() => {
                    this.$refs.modal.close();
                });
            },

        },
    };
</script>
