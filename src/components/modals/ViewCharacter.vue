/* eslint-disable vue/require-v-for-key */
<template>
    <uiModal
        ref="modal"
        :title="`Detail info about character ${this.character.name}`"
        hasFooter
        @close="close"
    >
        <template #modal-body>
            <div
                class="info"
                v-for="(value, name, index) in character"
                :key="index">

                <span class="info__label">{{ name }}: </span>
                <span class="info__value">{{ value }}</span>

            </div>

        </template>
        <template #modal-footer>
            <uiButtonsGroup>
                <uiButton
                    type="submit"
                    kind="accent"
                    @click.prevent="close">
                    <template #btn-text>
                        close
                    </template>
                </uiButton>
                <uiButton
                    type="reset"
                    kind="basic"
                    @click.prevent="close">
                    <template #btn-text>
                        cancel
                    </template>
                </uiButton>
            </uiButtonsGroup>

        </template>
    </uiModal>
</template>
<script>
    import {mapState} from 'vuex';
    import uiModal from '@/components/ui/modals/UIModal';
    import uiButton from '@/components/ui/btn/UIButton';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';

    export default {
        components: {
            uiModal,
            uiButton,
            uiButtonsGroup,
        },
        props: {
            param: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        data() {
            return {
                loader: false,
                errors: {
                    title: '',
                    error: '',
                },
            };
        },
        mounted() {
            this.getCharacter();
            this.$nextTick(() => {
                this.$refs.modal.show();
            });
        },
        computed: {
            ...mapState({
                character: (state) => state.favoriteCharacters.character,
            }),
        },
        methods: {
            getCharacter() {
                this.$store.dispatch('favoriteCharacters/getCharacter', {id: this.param.id});
            },
            close() {
                this.$refs.modal.close();
                this.$emit('close');
            },
        },
    };
</script>
<style lang="scss">

</style>
