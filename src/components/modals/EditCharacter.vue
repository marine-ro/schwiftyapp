/* eslint-disable vue/require-v-for-key */
<template>
    <uiModal
        ref="modal"
        :title="`Detail info about character ${this.requestForm.id}`"
        @close="close"
    >
        <template #modal-body>
            <form
                class="form"
                action=""
                v-if="requestForm">
                <div class="form__body">
                    <div class="form__row">
                        <label class=" form__block form__block--1-2">
                            <span class="form__label form__label--top">name</span>
                            <input
                                class="form__control form__input"
                                type="text"
                                v-model="requestForm.name"
                                placeholder="Enter name"
                            />
                        </label>
                        <label class=" form__block form__block--1-2">
                            <span class="form__label form__label--top">species</span>
                            <input
                                class="form__control form__input"
                                type="text"
                                v-model="requestForm.species"
                                placeholder="Enter species" />
                        </label>
                        <label class=" form__block form__block--1-2">
                            <span class="form__label form__label--top">status</span>
                            <vSelect
                                class="form__control vs-custom--down"
                                :options="status"
                                label="choose status"
                                :reduce="(option) => option"
                                :searchable="false"
                                :clearable="true"
                                placeholder="choose status"
                                v-model="requestForm.status"
                            >
                                <template slot="no-options">no</template>
                            </vSelect>
                        </label>
                        <label class=" form__block form__block--1-2">
                            <span class="form__label form__label--top">gender</span>
                            <vSelect
                                class="form__control vs-custom--down"
                                :options="gender"
                                ref="select"
                                :reduce="(option) => option"
                                :searchable="false"
                                :clearable="true"
                                placeholder="choose gender"
                                v-model="requestForm.gender"
                            >
                                <template slot="no-options">no</template>
                            </vSelect>
                        </label>

                    </div>
                </div>
                <div class="form__footer">
                    <uiButtonsGroup>
                        <uiButton
                            type="submit"
                            kind="accent"
                            @click.prevent="sendForm">
                            <template #btn-text>
                                save
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

                </div>

            </form>

        </template>
    </uiModal>
</template>
<script>
    import vSelect from 'vue-select';
    import uiModal from '@/components/ui/modals/UIModal';
    import uiButton from '@/components/ui/btn/UIButton';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';

    import {DEEP_CLONE} from '@/utils/constants';

    const STATUS = ['alive', 'dead', 'unknown'];
    const GENDER = ['female', 'male', 'genderless', 'unknown'];

    export default {
        components: {
            vSelect,
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
                status: STATUS,
                gender: GENDER,
            };
        },
        beforeMount() {

        },
        mounted() {
            this.getCharacter();

            this.$nextTick(() => {
                this.$refs.modal.show();
            });
        },
        computed: {
            requestForm() {
                return DEEP_CLONE(this.$store.state.favoriteCharacters.character);
            },
        },
        methods: {
            getCharacter() {
                this.$store.dispatch('favoriteCharacters/getCharacter', {id: this.param.id});
            },
            close() {
                this.$refs.modal.close();
                this.$emit('close');
            },
            editCharacter() {
                this.$store.dispatch('favoriteCharacters/editCharacter', {character: this.requestForm});
                this.close();
                this.$emit('callback');
            },

            sendForm() {
                this.editCharacter();
            },
        },
    };
</script>
<style lang="scss">

</style>
